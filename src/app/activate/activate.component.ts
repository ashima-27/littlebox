import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  
  acode:string;
  msg:string;
  constructor( private myroute:ActivatedRoute,private signupobj:SignupService) { 
   this.myroute.queryParams.subscribe({
     next:(resp)=>{
       this.acode=resp['code'];
     },
     error:(err)=>{

     }
   })

  }

  ngOnInit(): void {
    this.signupobj.fetchacode(this.acode).subscribe({
      next:(resp:any)=>{
        this.msg="done"
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

}
