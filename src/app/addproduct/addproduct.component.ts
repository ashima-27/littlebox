import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProdService } from './../prod.service';
import { SubcatService } from './../subcat.service';
import { CatService } from './../cat.service';
import { Component, OnInit } from '@angular/core';
import { Conn } from '../conn';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  subcat: string = '';
  category: string = '';
  prodname: string;
  rate: string;
  dis: string;
  stock: string;
  descrp: string;
  prodpic: string;
  msg: string;
  myfile: File;
  allcatlist: string[];
  allsubcatlist: string[];
  allprodlistitems: string[];
  flag: boolean;
  constructor(
    private catsrvobj: CatService,
    private subcatsrvobj: SubcatService,
    private prodsrvobj: ProdService,
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

  addprod() {
    var mydata = new FormData();
    mydata.append('cid', this.category);
    mydata.append('scid', this.subcat);
    mydata.append('pid', this.prodname);
    mydata.append('rate', this.rate);
    mydata.append('discount', this.dis);
    mydata.append('stock', this.stock);
    mydata.append('descp', this.descrp);
    mydata.append('prodpic', this.myfile);

    this.prodsrvobj.addproduct(mydata).subscribe({
      next: (resp) => {
        this.msg = resp;
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }

  fileselected(event) {
    this.myfile = event.target.files[0];
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

  // fetching subcategories
  fetchsubcat() {
    this.allsubcatlist = [];
    this.subcat = '';
    this.subcatsrvobj.fetchsubcatbyid(this.category).subscribe({
      next: (resp: any[]) => {
        this.allsubcatlist = resp;
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }

  showprod() {
    this.prodsrvobj.fetchprodcatbyid(this.subcat).subscribe({
      next: (resp: any[]) => {
        this.allprodlistitems = resp;
        console.log(resp);
        if (this.allprodlistitems.length > 0) {
          this.flag = true;
          this.msg = null;
        } else {
          this.flag = false;
          this.msg = 'no product!!';
        }
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }

  onproddel(id) {
    var choice = confirm('are u sure you want to del it?');
    if (choice == true) {
      this.myhttp
        .delete(Conn.nodeurl + '/api/deleteproduct?prodid=' + id, {
          responseType: 'json',
        })
        .subscribe({
          next: (resp) => {
            if (resp['deletedCount'] == 1) {
              alert('Product deleted successfully');
              this.showprod();
            } else {
              alert('Product not deleted');
            }
          },
          error: (err) => {
            this.msg = err;
          },
        });
    }
  }
}
