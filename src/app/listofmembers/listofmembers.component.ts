import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Conn } from '../conn';

@Component({
  selector: 'app-listofmembers',
  templateUrl: './listofmembers.component.html',
  styleUrls: ['./listofmembers.component.css'],
})
export class ListofmembersComponent implements OnInit {
  name: string;
  phone: string;
  username: string;
  msg: string;
  memblist: string[];
  constructor(private myhttp: HttpClient, private myrouter: Router) {
    if (
      sessionStorage.getItem('un') == undefined ||
      sessionStorage.getItem('utype') != 'admin'
    ) {
      this.myrouter.navigateByUrl('/signin');
    }
  }

  ngOnInit(): void {
    this.myhttp.get(Conn.nodeurl + '/api/memlist').subscribe({
      next: (res: string[]) => {
        this.memblist = res;
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }
  ondel(memid) {
    var choice = confirm('Are You Sure To Remove The User ?');
    if (choice == true) {
      this.myhttp
        .delete(Conn.nodeurl + '/api/deleteuser?uid=' + memid, {
          responseType: 'json',
        })
        .subscribe({
          next: (resp) => {
            if (resp['deletedCount'] == 1) {
              alert('user deleted successfully');
              this.ngOnInit();
            } else {
              alert('user not deleted');
            }
          },
          error: (err) => {
            this.msg = err;
          },
        });
    }
  }
}
