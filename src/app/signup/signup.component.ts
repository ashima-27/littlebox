import { SignupService } from './../signup.service';
import { Account } from './../account';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Conn } from '../conn';
import { FormGroup } from '@angular/forms';

import { NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  name: string;
  password: string;
  cpassword: string;
  username: string;
  phone: string;
  accountobj: Account;
  msg: string;

  constructor(private signupserobj: SignupService, private myroute: Router) {}

  ngOnInit(): void {}

  Onsignup() {
    var encytext = CryptoJS.AES.encrypt(this.password, Conn.skey).toString();
    //  var encun=CryptoJS.AES.encrypt(this.username,Conn.uname).toString();
    alert(encytext);
    //  alert(encun);
    console.log(encytext);
    //  console.log(encun);
    this.accountobj = new Account(
      this.name,
      this.phone,
      this.username,
      encytext,
      this.cpassword,
      'normal'
    );
    console.log(this.accountobj);

    this.signupserobj.save2db(this.accountobj).subscribe({
      next: (res) => {
        this.msg = res;
        this.myroute.navigateByUrl('signin');
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }
}
// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    // return null if controls haven't initialised yet
    if (!control || !matchingControl) {
      return null;
    }

    // return null if another validator has already found an error on the matchingControl
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return null;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
