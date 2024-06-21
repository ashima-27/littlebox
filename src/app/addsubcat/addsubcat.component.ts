import { Router } from '@angular/router';
import { SubcatService } from './../subcat.service';
import { CatService } from './../cat.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conn } from '../conn';

@Component({
  selector: 'app-addsubcat',
  templateUrl: './addsubcat.component.html',
  styleUrls: ['./addsubcat.component.css'],
})
export class AddsubcatComponent implements OnInit {
  category: string = '';
  scatname: string;
  myfile: File;
  msg: string;
  allcatlist: string[];
  subcatlist: string[];
  flag: boolean = false;
  constructor(
    private catsrvobj: CatService,
    private subcatsrvobj: SubcatService,
    private myhttp: HttpClient,
    private myrouter: Router
  ) {
    this.fetchcat();
    if (
      sessionStorage.getItem('un') == undefined ||
      sessionStorage.getItem('utype') != 'admin'
    ) {
      this.myrouter.navigateByUrl('/signin');
    }
  }

  ngOnInit(): void {}

  fileselected(event) {
    this.myfile = event.target.files[0];
  }

  addsubcat() {
    var mydata = new FormData();
    mydata.append('cid', this.category);
    mydata.append('scname', this.scatname);
    mydata.append('scatpic', this.myfile);
    // this.subcatserobj.addsubcat2db(mydata).subscribe({
    this.myhttp
      .post(Conn.nodeurl + '/api/addsubcat', mydata, { responseType: 'text' })
      .subscribe({
        next: (resp) => {
          this.msg = resp;
        },
        error: (err) => {
          this.msg = err;
        },
      });
  }

  showsubcat() {
    this.subcatsrvobj.fetchsubcatbyid(this.category).subscribe({
      next: (resp: any[]) => {
        this.subcatlist = resp;
        if (this.subcatlist.length > 0) {
          this.flag = true;
          this.msg = null;
        } else {
          this.flag = false;
          this.msg = 'no sub category';
        }
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }

  fetchcat() {
    this.catsrvobj.fetchallcat().subscribe({
      next: (resp: any[]) => {
        this.allcatlist = resp;
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }

  oncatdel(id) {
    var choice = confirm('are u sure you want to del it?');
    if (choice == true) {
      this.myhttp
        .delete(Conn.nodeurl + '/api/deletesubcat?catid=' + id, {
          responseType: 'json',
        })
        .subscribe({
          next: (resp) => {
            if (resp['deletedCount'] == 1) {
              alert('sub category deleted successfully');
              this.showsubcat();
            } else {
              alert('sub category not deleted');
            }
          },
          error: (err) => {
            this.msg = err;
          },
        });
    }
  }
}
