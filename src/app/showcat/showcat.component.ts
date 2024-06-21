import { CatService } from './../cat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showcat',
  templateUrl: './showcat.component.html',
  styleUrls: ['./showcat.component.css']
})
export class ShowcatComponent implements OnInit {

  allcatlist:string[];
  msg:string;
  constructor(private catsrvobj:CatService) {
    this.fetchcat();
   }

  ngOnInit(): void {
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
}
