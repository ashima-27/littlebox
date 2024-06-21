import { Router, NavigationEnd } from '@angular/router';
import { CartService } from './../cart.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Conn } from '../conn';
@Component({
  selector: 'app-normalheader',
  templateUrl: './normalheader.component.html',
  styleUrls: ['./normalheader.component.css'],
})
export class NormalheaderComponent implements OnInit {
  hidden = false;
  user: string;
  notivalue = 0;
  cartflag: boolean;
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  constructor(private router: Router, private cartsobj: CartService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getcart();
      }
    });
    if (sessionStorage.getItem('un') == undefined) {
      this.cartflag = false;
    } else {
      this.cartflag = true;
    }
  }
  getcart() {
    this.cartsobj.fetchcart(sessionStorage.getItem('un')).subscribe({
      next: (res: any[]) => {
        this.notivalue = res.length;
      },
      error: (err) => {},
    });
  }
  ngOnInit(): void {
    /*  this.myhttp
      .get(Conn.nodeurl + '/api/badges?user' + this.user, {
        responseType: 'json',
      })
      .subscribe({
        next: (resp: any) => {},
        error: (err) => {},
      }); */
  }
}
