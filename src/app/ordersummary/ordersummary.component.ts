import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css'],
})
export class OrdersummaryComponent implements OnInit {
  orderid: string;
  cartprods: any[];
  updateitems: any[] = [];
  orditems: any[] = [];
  constructor(private cartsrvobj: CartService) {
    this.fetchordernumber();
  }

  ngOnInit(): void {}

  fetchordernumber() {
    this.cartsrvobj.fetchorderid(sessionStorage.getItem('un')).subscribe({
      next: (resp: any[]) => {
        this.orderid = resp[0]['_id'];
        // console.log(this.orderid);
        // console.log('gotid');
        this.fetchcart();
      },
      error: (err) => {},
    });
  }
  fetchcart() {
    this.cartsrvobj.fetchcart(sessionStorage.getItem('un')).subscribe({
      next: (resp: any[]) => {
        this.cartprods = resp;
        this.updatestockdb();
      },
      error: (err) => {},
    });
  }
  updatestockdb() {
    this.updateitems = [];
    for (let x = 0; x < this.cartprods.length; x++) {
      let updatedata = {
        pid: this.cartprods[x]['prodid'],
        qty: this.cartprods[x]['qty'],
      };
      this.updateitems.push(updatedata);
    }
    this.cartsrvobj.updatestock(this.updateitems).subscribe({
      next: () => {
        alert('Success');
        this.saveorderitems();
      },
      error: () => {},
    });
  }
  saveorderitems() {
    this.orditems = [];
    for (let x = 0; x < this.cartprods.length; x++) {
      let myprod = {
        orderid: this.orderid,
        pid: this.cartprods[x]['prodid'],
        pname: this.cartprods[x]['prodname'],
        prate: this.cartprods[x]['rate'],
        qty: this.cartprods[x]['qty'],
        tc: this.cartprods[x]['totalcost'],
        ppic: this.cartprods[x]['picture'],
        username: sessionStorage.getItem('un'),
      };
      this.orditems.push(myprod);
    }
    this.cartsrvobj.saveorderprods(this.orditems).subscribe({
      next: (resp) => {
        this.cartdel();
      },
      error: (err) => {},
    });
  }
  cartdel() {
    this.cartsrvobj.delcart(sessionStorage.getItem('un')).subscribe({
      next: (resp) => {},
      error: (err) => {},
    });
  }
}
