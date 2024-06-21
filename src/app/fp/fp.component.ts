import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Conn } from '../conn';
@Component({
  selector: 'app-fp',
  templateUrl: './fp.component.html',
  styleUrls: ['./fp.component.css'],
})
export class FpComponent implements OnInit {
  username: string;
  msg: string;
  constructor(private myhttp: HttpClient) {}

  ngOnInit(): void {}
  forget() {
    var mydata = { uname: this.username };
    this.myhttp
      .post(Conn.nodeurl + '/api/forgetpassword', mydata, {
        responseType: 'text',
      })
      .subscribe({
        // this.myhttp.post(Conn.nodeurl+"/api/forgetpassword?username=" + this.username,{responseType:"json"}).subscribe({

        next: (resp) => {
          this.msg = resp;
        },

        error: (err) => {
          this.msg = 'err';
        },
      });
  }
}
