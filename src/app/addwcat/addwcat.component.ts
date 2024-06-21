import { HttpClient } from '@angular/common/http';
import { WcatService } from './../wcat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addwcat',
  templateUrl: './addwcat.component.html',
  styleUrls: ['./addwcat.component.css']
})
export class AddwcatComponent implements OnInit {

  msg:string;
  catname:string;
  myfile:File;
  allcatlist:string[];
  cpic:string;
  flag:boolean=false;
  catid:string;


  constructor(private catwsrvobj:WcatService,private myhttp:HttpClient) { }

  ngOnInit(): void {
  }
  fileselected(event){
    this.myfile=event.target.files[0];
  } 
  addcat(){
    
    var mydata= new FormData();
    mydata.append("cname",this.catname);
    mydata.append("catpic",this.myfile);

    this.catwsrvobj.addcat2db(mydata).subscribe({
      next:(resp)=>{
        this.msg=resp;
      
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

  catupdate(){
  var mydata =new FormData();
  //!=null means that admin has chosen a pic for updating
  if(this.myfile!=null)
  {
    mydata.append("cname",this.catname);
    mydata.append("catpic",this.myfile);
    mydata.append("oldpicname",this.cpic);
    mydata.append("cid",this.catid);
  }
  else{
    mydata.append("cname",this.catname);
    mydata.append("oldpicname",this.cpic);
    mydata.append("cid",this.catid);
  }
  this.catwsrvobj.catupdate(mydata).subscribe({
    next:(resp)=>{
      if(resp["nModified"]==1)
        {
          this.msg="Category Updated Successfully";
          this.fetchcat();
        }
        else
        {
          this.msg="Category not updated Successfully"
        }
    },
    error:(err)=>{
      this.msg=err;
    }
  });
  }

  fetchcat()
  {
    this.catwsrvobj.fetchallcat().subscribe({
      next:(resp:any[])=>
      {
        this.allcatlist=resp;
      },
      error:(err)=>{
        this.msg=err; 
      }
    })
  } 

  oncatdel(id){
var choice=confirm("Are u sure you want to del it?");
    if(choice==true){
      // this.myhttp.delete("http://localhost:3000/api/deletecat?name="+id,{responseType:"json"}).subscribe(
      this.myhttp.delete("http://localhost:3000/api/deletecat?cid="+id,{responseType:"json"}).subscribe(

      {
        next:(resp)=>{
          if(resp["deletedCount"]==1)
          {
            alert("category deleted successfully");
            this.fetchcat();
          }
          else{
            alert("category not deleted");
          }
        },
        error:(err)=>{
          this.msg=err;
        }
      }

      )

  }}
  onupdate(_id,cname,catpic){

    this.flag=true;
    this.catname=cname;
    this.cpic=catpic;
    this.catid=_id;
  }

  oncancel(){
    this.flag=false;
     this.catname=null;
  }
}
