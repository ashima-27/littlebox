import { SignupService } from './../signup.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Conn } from '../conn';
import { CookieService } from 'ngx-cookie-service';
// import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  password: any;
  username: string;
  msg: string;
  id: string;
  pid: string;
  prodid: string;
  remcheck: boolean;
  activated: boolean = false;
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;

  public static signin: string = 'normal';
  constructor(
    private myhttp: HttpClient,
    private myrouter: Router,
    private myroute: ActivatedRoute,
    private cookieService: CookieService,
    private signupobj: SignupService
  ) {
    const cookieExists: boolean = this.cookieService.check('usercookie');

    if (cookieExists == true) {
      var userdata = JSON.parse(this.cookieService.get('usercookie'));
      this.signupobj.save2db(userdata.username).subscribe({
        next: (resp) => {
          if (resp[0] == null) {
          } else {
            if (resp[0].activated == true) {
              if (resp[0].password == userdata.pass) {
                sessionStorage.setItem('pname', resp[0].name);
                sessionStorage.setItem('un', resp[0].username);
                if (resp[0].usertype == 'admin') {
                  // SigninComponent.signin="admin";
                  this.myrouter.navigateByUrl('/adminpanel');
                } else {
                  SigninComponent.signin = 'normal';
                  this.myrouter.navigateByUrl('/homepage');
                }
              }
            }
          }
        },
        error: (err) => {
          this.msg = err;
        },
      });
    }
  }

  ngOnInit(): void {}

  onsignin() {
    var databody = { uname: this.username, pass: this.password };
    console.log(databody);
    this.myhttp
      .post(Conn.nodeurl + '/api/signin', databody, { responseType: 'json' })
      .subscribe({
        next: (resp: any[]) => {
          if (resp.length == 0) {
            this.msg = 'incorrect username';
          } else {
            if (resp[0].activated == true) {
              var decryptext = CryptoJS.AES.decrypt(
                resp[0].password,
                Conn.skey
              ).toString(CryptoJS.enc.Utf8);
              // var decryptext = CryptoJS.AES.decrypt(resp[0].username,Conn.uname).toString( CryptoJS.enc.Utf8);
              // alert(decryptext);
              if (decryptext == this.password) {
                if (this.remcheck == true) {
                  var cookiedata = {
                    username: this.username,
                    pass: resp[0].password,
                  };
                  this.cookieService.set(
                    'usercookie',
                    JSON.stringify(cookiedata),
                    20
                  );
                }

                sessionStorage.setItem('pname', resp[0].name);
                sessionStorage.setItem('un', resp[0].username);
                sessionStorage.setItem('utype', resp[0].usertype);
                if (this.prodid != undefined) {
                  this.myrouter.navigateByUrl(
                    'showproddetails?pid=' + this.prodid
                  );
                } else {
                  if (resp[0].usertype == 'admin') {
                    SigninComponent.signin = 'admin';
                    this.myrouter.navigateByUrl('/addcat');
                  } else {
                    if (this.id === this.pid) {
                      this.myrouter.navigateByUrl('/showproddetails');
                    }
                    SigninComponent.signin = 'normal';
                    this.myrouter.navigateByUrl('/home');
                  }
                }
              } else {
                this.msg = 'incorrect username/password';
              }
            } else {
              this.msg =
                'Your Account Is NOT ACTIVATED , To ACTIVATE Your Account  Please Check Your Mail.';
            }
          }
        },
        error: (err) => {
          this.msg = err;
        },
      });
  }

  //  oncookieset(){
  //      this.cookieService.set('mycookie','This is cookiiieeeeee',20);
  //  }

  //  oncookieget(){
  //   const cookieExists: boolean =this.cookieService.check('mycookie');
  //   if(cookieExists==true){
  //     this.msg =this.cookieService.get('mycookie');
  //   }
  //  }
}
