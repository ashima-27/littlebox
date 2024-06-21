import { ProdService } from './../prod.service';
import { SubcatService } from './../subcat.service';
import { CatService } from './../cat.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css'],
})
export class UpdateproductComponent implements OnInit {
  productname: string;
  category: string = '';
  allcatlist: string[];
  subcat: string;
  myfile: File;
  catid: string;
  subcatlist: any[];
  prodid: string;
  prodname: string;
  Productpic: string;
  productlist: string[];
  msg: string;
  flag: boolean;
  constructor(
    private myhttp: HttpClient,
    private catsrvobj: CatService,
    private subcatserobj: SubcatService,
    private prodsrvobj: ProdService,
    private myroute: ActivatedRoute,
    private router: Router
  ) {
    this.fetchcat();
    // this.fetchsubcat();
    this.myroute.queryParams.subscribe({
      next: (params) => {
        this.prodid = params['prodname'];
        this.fetchproddetails();
      },
    });
  }

  ngOnInit(): void {}

  fileselected(event) {
    this.myfile = event.target.files[0];
  }
  addprod() {
    var mydata = new FormData();
    mydata.append('cid', this.category);
    mydata.append('scid', this.subcat);
    mydata.append('productname', this.productname);
    mydata.append('Productpic', this.myfile);
    this.prodsrvobj.addproduct(mydata).subscribe({
      next: (resp) => {
        this.msg = resp;
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }

  showprod() {
    this.prodsrvobj.fetchprodbysubcatid(this.subcat).subscribe({
      next: (resp: any[]) => {
        this.productlist = resp;
        if (this.productlist.length > 0) {
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

  fetchsubcat() {
    this.subcatserobj.fetchsubcatbyid(this.category).subscribe({
      next: (resp: any[]) => {
        this.subcatlist = resp;
        // if(this.subcatlist.length==0)
        // {
        //   this.msg="No Sub Categories";
        //   this.flag=false;
        // }
        // else
        // {
        //   this.flag=true;
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }

  productupdate() {
    var mydata = new FormData();
    if (this.myfile != null) {
      mydata.append('cid', this.category);
      mydata.append('scid', this.subcat);
      mydata.append('productname', this.productname);
      mydata.append('scatpic', this.myfile);
      mydata.append('oldpicname', this.Productpic);
      mydata.append('pid', this.prodid);
    } else {
      mydata.append('cid', this.category);
      mydata.append('scid', this.subcat);
      mydata.append('productname', this.productname);
      mydata.append('oldpicname', this.Productpic);
      mydata.append('pid', this.prodid);
    }

    this.prodsrvobj.productupdate(mydata).subscribe({
      next: (resp) => {
        if (resp['nModified'] == 1) {
          this.msg = 'Product updated successfully';
        } else {
          this.msg = 'Product not updated successfully';
        }
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }

  fetchproddetails() {
    this.prodsrvobj.fetchproddetailbyid(this.prodid).subscribe({
      next: (resp: any[]) => {
        // console.log(resp);
        this.category = resp[0].catid;
        this.fetchsubcat();
        this.subcat = resp[0].subcatid;
        this.prodname = resp[0].prodname;
        this.Productpic = resp[0].Productpic;
      },
      error: (err) => {
        this.msg = err;
      },
    });
  }

  oncancel() {
    this.router.navigateByUrl('showproducts');
  }
}
