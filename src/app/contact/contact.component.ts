import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Conn} from'../conn';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  pname:string;
  phone:string;
  mailid:string;
  message:string;
  msg:string;

  constructor(private myhttp:HttpClient) { }

  ngOnInit(): void {
  }

  // we r sending msg to api
 sndmsg(){
  
  var maildata={name:this.pname,phone:this.phone,emailid:this.mailid,mess:this.message};
  this.myhttp.post(Conn.nodeurl+"/api/contactus",maildata,{responseType:"text"}).subscribe({
    next:(resp)=>{
   this.msg=resp;
    },
    error:(err)=>{
       this.msg=err;
    }
  })
 }


}