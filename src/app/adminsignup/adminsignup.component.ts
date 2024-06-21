import { SignupService } from './../signup.service';
import { Component, OnInit } from '@angular/core';
import { Account } from './../account';
import { Router } from '@angular/router';
import { Conn } from '../conn';
import * as CryptoJS from 'crypto-js';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-adminsignup',
  templateUrl: './adminsignup.component.html',
  styleUrls: ['./adminsignup.component.css']
})
export class AdminsignupComponent implements OnInit {

  name:string;
  password:string;
  cpassword:string;
  username:string;
  phone:string;
  accountobj:Account;
  msg :string;
  constructor( private signupserobj:SignupService ,private router: Router) { }


  ngOnInit(): void {
  }

  Onsignup(){
    var encytext = CryptoJS.AES.encrypt(this.password, Conn.skey).toString();
    //  var encun=CryptoJS.AES.encrypt(this.username,Conn.uname).toString();
    alert(encytext);
    //  alert(encun);
    console.log(encytext);
    this.accountobj = new Account(this.name,this.phone,this.username,encytext,this.cpassword,'admin');
    console.log(this.accountobj);

    this.signupserobj.save2db(this.accountobj).subscribe({

      next:(res)=>{
        this.msg=res;
        this.router.navigateByUrl("signin");

      },
      error:(err)=>{
        this.msg=err;
      }
    })

  }
}
