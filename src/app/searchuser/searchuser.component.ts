import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Conn } from '../conn';

@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.component.html',
  styleUrls: ['./searchuser.component.css'],
})
export class SearchuserComponent implements OnInit {
  name: String;
  phone: string;
  username: string;
  msg: string;
  constructor(private myhttp: HttpClient, private myrouter: Router) {
    if (
      sessionStorage.getItem('un') == undefined ||
      sessionStorage.getItem('utype') != 'admin'
    ) {
      this.myrouter.navigateByUrl('/signin');
    }
  }

  ngOnInit(): void {}
  onsearch() {
    this.myhttp
      .get(Conn.nodeurl + '/api/searchuser?username=' + this.username, {
        responseType: 'json',
      })
      .subscribe({
        next: (resp: any[]) => {
          if (resp.length == 0) {
            this.msg = 'Incorrect Username';
            this.name = '';
            this.phone = '';
          } else {
            this.msg = 'User Found!!';
            this.name = resp[0].name;
            this.phone = resp[0].phone;
          }
        },
        error: (err) => {},
      });
  }
}
