import { HttpClient } from '@angular/common/http';
import { SignupService } from './../signup.service';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Conn } from '../conn';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
})
export class ChangepasswordComponent implements OnInit {
  curpass: string;
  newpass: string;
  conpass: string;
  msg: string;
  fetchpassword: string;
  constructor(
    private signupobj: SignupService,
    private myrouter: Router,
    private myhttp: HttpClient
  ) {
    this.fetchpass();
  }

  ngOnInit(): void {}

  fetchpass() {
    var databody = { uname: sessionStorage.getItem('un') };
    this.myhttp
      .post(Conn.nodeurl + '/api/signin', databody, { responseType: 'json' })
      .subscribe({
        next: (resp: any) => {
          this.fetchpassword = CryptoJS.AES.decrypt(
            resp[0].password,
            Conn.skey
          ).toString(CryptoJS.enc.Utf8);
        },
        error: (err) => {},
      });
  }

  updatepass() {
    if (this.newpass == this.conpass) {
      if (this.curpass == this.fetchpassword) {
        var encpass = CryptoJS.AES.encrypt(this.newpass, Conn.skey).toString();
        var databody = {
          newpass: encpass,
          uname: sessionStorage.getItem('un'),
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
      this.msg = "new password doesn't match";
    }
  }
}
