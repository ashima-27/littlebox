import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private myrouter:Router, private CookieService :CookieService) { 
    sessionStorage.clear();
    this.CookieService.delete("usercookie");
this.myrouter.navigateByUrl("/signin");
  }

  ngOnInit(): void {
  }

}
