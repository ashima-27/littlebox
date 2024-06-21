import { HttpClient } from '@angular/common/http';
import { ProdService } from './../prod.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Conn} from '../conn';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {
  scatid:string;
  productlist:string[];
  msg:string;
  flag:boolean=false;
  searchtxt:string;
  constructor(private myroute:ActivatedRoute
    ,private prodsrvobj:ProdService,private myhttp:HttpClient) { }

  ngOnInit(): void {
    this.myroute.queryParams.subscribe({
      next:(resp)=>{
        this.searchtxt=resp["s"];
      
        this.searchprod();
      },
      error:(err)=>{

      }
    })
  }
  // fetchprod(){
  //   this.prodsrvobj.fetchprodbysubcatid(this.scatid).subscribe({
  
  //     next:(resp:any[])=>{
  
  //       this.productlist=resp;
  //       if(this.productlist.length==0){
  //         this.msg="no products";
  //         this.flag=false;
  //       }
  //       else{
  //         this.flag=true;
  //       }
  //     },error:(err)=>{
  //       this.msg=err;
  //     }
  //   })
  // }
searchprod(){
  this.myhttp.get(Conn.nodeurl+"/api/fetchsearchprodbyname?s="+this.searchtxt,{responseType:"json"}).subscribe({
 
    next:(resp:any[])=>{
  
            this.productlist=resp;
      if(this.productlist.length==0){

      this.msg="No products";
      this.flag=false;
      }
      else{
        this.flag=true;
      }},
    error:(err)=>{
            this.msg=err;
          }
    
})


}
}