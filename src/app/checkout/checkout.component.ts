import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  msg: string;
  flag: boolean = false;
  pmode: string = '';
  shipaddr: string;
  coname: string = '';
  hname: string;
  z;
  cardno: string;
  expmonth: string;
  b;
  expyear: string;
  cvv: string;
  status: string;
  constructor(private cartsrvobj: CartService, private myroute: Router) {}

  ngOnInit(): void {}
  showcarddetails() {
    if (this.pmode == 'card') {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }
  oncheckout() {
    if (this.pmode == '') {
      this.msg = 'select mode of payment';
    } else if (this.pmode == 'cash') {
      var exp = this.expmonth + '/' + this.expyear;

      var data = {
        username: sessionStorage.getItem('un'),
        billamt: sessionStorage.getItem('billtotal'),
        status: 'Cash on Delivery, Order Processing',
        pmode: this.pmode,
        exp: exp,
      };

      this.cartsrvobj.savetocheckout(data).subscribe({
        next: (resp: string) => {
          if (resp == 'success') {
            // alert("i m working");
            // this.msg="done";
            this.myroute.navigateByUrl('/ordersummary');
          }
        },
        error: (err) => {
          this.msg = err;
        },
      });
    } else {
      var exp = this.expmonth + '/' + this.expyear;

      var mydata = {
        username: sessionStorage.getItem('un'),
        billamt: sessionStorage.getItem('billtotal'),
        status: 'Payment Received, Order Processing',
        saddress: this.shipaddr,
        pmode: this.pmode,
        coname: this.coname,
        cardno: this.cardno,
        holdername: this.hname,
        cvv: this.cvv,
        exp: exp,
      };

      this.cartsrvobj.savetocheckout(mydata).subscribe({
        next: (resp: string) => {
          if (resp == 'success') {
            // alert("i m working");
            // this.msg="done";
            this.myroute.navigateByUrl('/ordersummary');
          }
        },
        error: (err) => {
          this.msg = err;
        },
      });
    }
  }
}
