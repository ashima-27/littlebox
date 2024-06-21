import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-welguest',
  templateUrl: './welguest.component.html',
  styleUrls: ['./welguest.component.css'],
})
export class WelguestComponent implements OnInit {
  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;
  loginstatus: boolean;
  srtxt: string;

  name: any;
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('pname') == undefined) {
      this.loginstatus = false;
      this.name = 'Guest';
    } else {
      this.loginstatus = true;
      this.name = sessionStorage.getItem('pname');
    }
  }

  onsearch() {
    this.router.navigate(['/searchresults'], {
      queryParams: { s: this.srtxt },
    });
  }
}
