import { ProdService } from './../prod.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowproductComponent implements OnInit {
  scatid:string;
  productlist:string[];
  msg:string;
  flag:boolean=false;
  constructor(private myroute:ActivatedRoute
    ,private prodsrvobj:ProdService) { }

  ngOnInit(): void {
    this.myroute.queryParams.subscribe({
      next:(resp)=>{
        this.scatid=resp['scid'];
        this.fetchprod();
      },
      error:(err)=>{

      }
    })
  }
  fetchprod(){
    this.prodsrvobj.fetchprodbysubcatid(this.scatid).subscribe({
  
      next:(resp:any[])=>{
  
        this.productlist=resp;
        if(this.productlist.length==0){
          this.msg="no products";
          this.flag=false;
        }
        else{
          this.flag=true;
        }
      },error:(err)=>{
        this.msg=err;
      }
    })
  }
}
