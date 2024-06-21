import { CatService } from './../cat.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  orderid:string;
  orderprods:any[];
  constructor(private cartsrvobj:CartService,private myrouter:ActivatedRoute) {
    this.myrouter.queryParams.subscribe({
      next:(resp)=>{
        this.orderid=resp["oid"];
      },
      error:(err)=>{}
    });
    this.fetchorderproducts();
   }

  ngOnInit(): void {
  }
  fetchorderproducts()
  {
    this.cartsrvobj.fetchorderprods(this.orderid).subscribe(
      {
        next:(resp:any[])=>
        {
          this.orderprods=resp;
        },
        error:(err)=>
        {
          alert(err);
        }
      }
    )
  }
}
