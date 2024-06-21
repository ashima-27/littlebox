import { SubcatService } from './../subcat.service';
import { CatService } from './../cat.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updatesubcat',
  templateUrl: './updatesubcat.component.html',
  styleUrls: ['./updatesubcat.component.css']
})
export class UpdatesubcatComponent implements OnInit {
  category:string="";
  scatname:string;
  myfile:File;
  msg:string;
  allcatlist:string[];
 subcatlist:string[];
  flag:boolean=false;
 scid:string;
 subcatimg:string;

  constructor( private myhttp:HttpClient, private catsrvobj:CatService , private subcatsrvobj:SubcatService , private myroute:ActivatedRoute) { 

    this.fetchcat();
    this.myroute.queryParams.subscribe({
      next:(params)=>{
        this.scid=params["subcatid"];
        this.fetchscatdetails();
      }
    })

  }

  ngOnInit(): void {
  }

  fileselected(event){
    this.myfile=event.target.files[0];
  }
  addsubcat(){
    
    var mydata= new FormData();
     mydata.append("cid",this.category);
     mydata.append("scname",this.scatname);
     mydata.append("scatpic",this.myfile);
     this.subcatsrvobj.addsubcat2db(mydata).subscribe({
     // this.myhttp.post("http://localhost:3000/api/addsubcat",mydata,{responseType:"text"}).subscribe({
       next:(resp)=>{
         this.msg=resp;
       },
       error:(err)=>{
         this.msg=err;
       }
     });
   }
 
   showsubcat(){
     this.subcatsrvobj.fetchsubcatbyid(this.category).subscribe({
       next:(resp:any[])=>{
         this.subcatlist=resp;
         if(this.subcatlist.length>0){
           this.flag=true;
           this.msg=null;
         }
         else{
           this.flag=false;
           this.msg="no sub category"
         }
       },
       error:(err)=>{
         this.msg=err;
          }
     
     })
   }
 
   subcatupdate(){
      var mydata= new FormData();
      if(this.myfile!=null){
        mydata.append("cid",this.category);
        mydata.append("scname",this.scatname);
        mydata.append("scatpic",this.myfile);
        mydata.append("oldpicname",this.subcatimg);
        mydata.append("scid",this.scid);
 
      }
      else{
        mydata.append("cid",this.category);
        mydata.append("scname",this.scatname);
        mydata.append("oldpicname",this.subcatimg);
        mydata.append("scid",this.scid);
      }
 
      this.subcatsrvobj.subcatupdate(mydata).subscribe({
        next:(resp)=>{
          if(resp["nModified"]==1)
          {
            this.msg="sub cat updated successfully";
         
         
          }
          else{
            this.msg="sub cat not updated successfully";
          }
        },
        error:(err)=>{
          this.msg=err;
        }
      })
     }
   
 
 
 
   fetchcat(){
     this.catsrvobj.fetchallcat().subscribe({
       next:(resp:any[])=>{
         this.allcatlist=resp;
       },
       error:(err)=>{
         this.msg=err;
       }
     })
   }
 
   fetchscatdetails()
   {
     this.subcatsrvobj.fetchsubcatdetailsbyid(this.scid).subscribe(
       {
         next:(resp:any[])=>{
           // console.log(resp);
           this.category=resp[0].catid;
           this.scatname=resp[0].subcatname;
           this.subcatimg=resp[0].subcatpic;
 
 
         
       },
       error:(err)=>{
         this.msg=err;
       }}
     );
   }
 oncancel(){
   
 }

}
