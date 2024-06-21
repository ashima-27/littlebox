import { Router } from '@angular/router';
import { CatService } from './../cat.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Conn } from '../conn';

@Component({
  selector: 'app-addcat',
  templateUrl: './addcat.component.html',
  styleUrls: ['./addcat.component.css'],
})
export class AddcatComponent implements OnInit {
  msg: string;
  catname: string;
  myfile: File;
  allcatlist: string[];
  cpic: string;
  flag: boolean = false;
  catid: string;

  constructor(
    private myhttp: HttpClient,
    private catsrvobj: CatService,
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
  addcat() {
    var mydata = new FormData();
    mydata.append('cname', this.catname);
    mydata.append('catpic', this.myfile);

    this.catsrvobj.addcat2db(mydata).subscribe({
      next: (resp) => {
        this.msg = resp;
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }

  catupdate() {
    var mydata = new FormData();
    //!=null means that admin has chosen a pic for updating
    if (this.myfile != null) {
      mydata.append('cname', this.catname);
      mydata.append('catpic', this.myfile);
      mydata.append('oldpicname', this.cpic);
      mydata.append('cid', this.catid);
    } else {
      mydata.append('cname', this.catname);
      mydata.append('oldpicname', this.cpic);
      mydata.append('cid', this.catid);
    }
    this.catsrvobj.catupdate(mydata).subscribe({
      next: (resp) => {
        if (resp['nModified'] == 1) {
          this.msg = 'Category Updated Successfully';
          this.fetchcat();
        } else {
          this.msg = 'Category not updated Successfully';
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
    var choice = confirm('Are u sure you want to del it?');
    if (choice == true) {
      // this.myhttp.delete("http://localhost:3000/api/deletecat?name="+id,{responseType:"json"}).subscribe(
      this.myhttp
        .delete(Conn.nodeurl + '/api/deletecat?cid=' + id, {
          responseType: 'json',
        })
        .subscribe({
          next: (resp) => {
            if (resp['deletedCount'] == 1) {
              alert('category deleted successfully');
              this.fetchcat();
            } else {
              alert('category not deleted');
            }
          },
          error: (err) => {
            this.msg = err;
          },
        });
    }
  }
  onupdate(_id, cname, catpic) {
    this.flag = true;
    this.catname = cname;
    this.cpic = catpic;
    this.catid = _id;
  }

  oncancel() {
    this.flag = false;
    this.catname = null;
  }
}
