import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myshop';
  flag:boolean;
  constructor(private router:Router
    ){

    router.events.subscribe({
      next:(event)=>{
        if(event instanceof NavigationEnd){
          console.log(event);
          this.ngOnIt();
        }
      }
    })
  }
  ngOnIt(){

    var uti=sessionStorage.getItem('utype');
    // console.log(uti);
    if(uti=="admin"){
      this.flag=true;
    }
    else{
      this.flag=false;
    }
  }
}


