import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Conn} from '../conn';

@Component({
  selector: 'app-showcart',
  templateUrl: './showcart.component.html',
  styleUrls: ['./showcart.component.css']
})
export class ShowcartComponent implements OnInit {
  cartprods:string[];
  msg:string;
  flag:boolean;
  qty:string="";
  prodname:string;
  gtotal:number=0;
  constructor(private cartsobj:CartService,private myhttp:HttpClient) { this.getcart(); }

  ngOnInit(): void {
  }
  getcart() {
    this.gtotal = 0;
    this.cartsobj.fetchcart(sessionStorage.getItem('un')).subscribe({
      next: (res: any[]) => {
        if (res.length == 0) {
          this.flag = false;
        } else {
          this.flag = true;
          this.cartprods = res;
          // console.log(this.cartprods);
          for (let x = 0; x < this.cartprods.length; x++) {
            this.gtotal += this.cartprods[x]["totalcost"];
          }
          sessionStorage.setItem('billtotal', this.gtotal.toString());
          
        }
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }
    
  ondel(id) {
    var choice = confirm('Are you sure you want to remove?');
    if (choice) {
      this.myhttp.delete(Conn.nodeurl+"/api/deleteitem?prodid="+id,{responseType:"json"}).subscribe({
        next: (resp) => {
          if (resp['deletedCount'] == 1) {
            this.getcart();
          } else {
            alert('Item Not Removed');
          }
        },
        error: (err) => {
          this.msg = err;
        },
      });
    }
  }
}
