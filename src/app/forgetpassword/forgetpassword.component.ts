import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Conn } from '../conn';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent implements OnInit {
  flag: boolean;
  newpass: string;
  conpass: string;
  msg: string;
  expirytime: string;
  username: string;
  userhash: string;
  fetchpassword: string;
  uh: string;

  constructor(
    private myroute: ActivatedRoute,
    private myhttp: HttpClient,
    private signupobj: SignupService
  ) {
    this.myroute.queryParams.subscribe({
      next: (resp) => {
        this.userhash = resp['code'];

        this.myhttp
          .get(Conn.nodeurl + '/api/checktime?hash=' + this.userhash, {
            responseType: 'json',
          })
          .subscribe({
            next: (resp: any[]) => {
              if (resp.length == 0) {
                this.flag = false;
              } else {
                this.expirytime = resp[0].exptime;
                this.username = resp[0].username;
                //  alert(this.expirytime);
                // alert(this.username);
                var currentDate = new Date();
                if (currentDate.toString() > this.expirytime) {
                  this.flag = false;
                  this.msg = 'Link Expired !! <br> Please request new link...';
                } else {
                  this.flag = true;
                  this.fetchpass();
                }
              }
            },
            error: (err) => {},
          });
      },
    });
  }

  ngOnInit(): void {}

  fetchpass() {
    var databody = { uname: this.username };
    this.myhttp
      .post(Conn.nodeurl + '/api/signin', databody, { responseType: 'json' })
      .subscribe({
        next: (resp: any[]) => {
          this.fetchpassword = CryptoJS.AES.decrypt(
            resp[0].password,
            Conn.skey
          ).toString(CryptoJS.enc.Utf8);
          // console.log(this.fetchpassword);
        },
        error: (err) => {},
      });
  }

  update() {
    if (this.newpass == this.conpass) {
      if (this.newpass == this.fetchpassword) {
        this.msg = 'Change this password as this is your previous password';
      } else {
        var encpass = CryptoJS.AES.encrypt(this.newpass, Conn.skey).toString();
        var databody = {
          newpass: encpass,
          uname: this.username,
        };

        this.signupobj.updatepass(databody).subscribe({
          next: (resp) => {
            if (resp['nModified'] == 1) {
              this.msg = 'password changed successfully';
            } else {
              this.msg = 'incorrect current password';
            }
          },
          error: (err) => {
            this.msg = err;
          },
        });
      }
    } else {
      this.msg = " password doesn't match";
    }
  }
}
