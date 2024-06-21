import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-listoforders',
  templateUrl: './listoforders.component.html',
  styleUrls: ['./listoforders.component.css'],
})
export class ListofordersComponent implements OnInit {
  orderlist: string[];
  msg: string;
  constructor(private cartsrvobj: CartService, private myrouter: Router) {
    this.fetchorders();
    if (
      sessionStorage.getItem('un') == undefined ||
      sessionStorage.getItem('utype') != 'admin'
    ) {
      this.myrouter.navigateByUrl('/signin');
    }
  }

  ngOnInit(): void {}
  fetchorders() {
    this.cartsrvobj.fetchallorders().subscribe({
      next: (resp: any[]) => {
        if (resp.length > 0) {
          this.orderlist = resp;
        } else {
          this.msg = 'No Orders found';
        }
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }
}
