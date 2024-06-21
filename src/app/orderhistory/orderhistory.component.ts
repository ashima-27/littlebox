import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css'],
})
export class OrderhistoryComponent implements OnInit {
  orderlist: string[];
  msg: string;
  user: string;
  constructor(
    private cartsrvobj: CartService,
    private myroute: ActivatedRoute
  ) {
    this.myroute.queryParams.subscribe({
      next: (resp) => {
        this.user = resp['uname'];
      },
      error: (err) => {},
    });

    this.fetchuserorders();
  }

  ngOnInit(): void {}
  fetchuserorders() {
    this.cartsrvobj
      .fetchuserorder(sessionStorage.getItem('un') || this.user)
      .subscribe({
        next: (resp: any[]) => {
          if (resp.length > 0) {
            console.log(resp);

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
