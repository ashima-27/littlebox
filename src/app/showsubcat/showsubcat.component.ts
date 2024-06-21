import { SubcatService } from './../subcat.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showsubcat',
  templateUrl: './showsubcat.component.html',
  styleUrls: ['./showsubcat.component.css']
})
export class ShowsubcatComponent implements OnInit {
  subcatlist:string[];
  catid:string;
  flag:boolean=false;
  msg:string;
  constructor(private subcatserobj:SubcatService,private myroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.myroute.queryParams.subscribe(
      {
        next:(resp)=>
        {
          this.catid=resp["cid"];
          this.fetchsubcat();

        },
        error:(err)=>
        {

        }
      }
    )
  }
  fetchsubcat(){
    this.subcatserobj.fetchsubcatbyid(this.catid).subscribe({
      next:(resp:any[])=>{
        this.subcatlist=resp;
        if(this.subcatlist.length==0)
        {
          this.msg="No Sub Categories";
          this.flag=false;
        }
        else
        {
          this.flag=true;
        }},
      error:(err)=>{
        this.msg=err;
      }
    
  })
}

}
