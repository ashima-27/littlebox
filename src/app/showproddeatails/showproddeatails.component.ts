import { HttpClient } from '@angular/common/http';
import { ProdService } from './../prod.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-showproddeatails',
  templateUrl: './showproddeatails.component.html',
  styleUrls: ['./showproddeatails.component.css'],
})
export class ShowproddeatailsComponent implements OnInit {
  // name = '<ng-magnizoom> EXAMPLES';
  imageStyleAndClassAsText = `[imageStyle]="{ 'max-width': '100%', 'max-height': '100%' }"\n[imageClass]="{ 'custom-class': true }"\n\n::ng-deep .custom-class { filter: invert; }`;
  prodid: string;
  pdetails: string[];

  pname: string[];
  ppic: string;
  rt: number;
  disamt: number;
  reamt: number;
  dis: number;
  stock: number;
  stockloop: number[] = [];
  desc: string;
  flag: boolean;
  buttonflag: boolean;
  qty: string = '';
  msg: string;

  // public imagePath;
  // imgURL: any;
  // public message: string;
  // enableZoom: Boolean = true;
  // previewImageSrc: any;
  // zoomImageSrc: any;

  constructor(
    private myroute: ActivatedRoute,
    private prodsrvobj: ProdService,
    private cartobj: CartService,
    private myrouter: Router,
    private myhttp: HttpClient // private ngxImgZoom: NgxImgZoomService
  ) {
    this.myroute.queryParams.subscribe({
      next: (resp) => {
        this.prodid = resp['pid'];
        this.fetchproddetails();
      },
      error: (err) => {},
    });
    this.prodcheck();
    // this.ngxImgZoom.setZoomBreakPoints([
    //   { w: 100, h: 100 },
    //   { w: 150, h: 150 },
    //   { w: 200, h: 200 },
    //   { w: 250, h: 250 },
    //   { w: 300, h: 300 },
    // ]);
  }

  ngOnInit(): void {}
  fetchproddetails() {
    this.prodsrvobj.fetchproddetailbyid(this.prodid).subscribe({
      next: (resp: any[]) => {
        this.pdetails = resp;
        this.rt = this.pdetails[0]['rate'];
        this.dis = this.pdetails[0]['discount'];
        this.disamt = (this.dis * this.rt) / 100;
        this.reamt = this.rt - this.disamt;
        this.stock = this.pdetails[0]['Stock'];
        this.pname = this.pdetails[0]['prodname'];
        this.ppic = this.pdetails[0]['Productpic'];
        this.desc = this.pdetails[0]['description'];
        if (this.stock <= 0) {
          this.flag = false;
        } else {
          this.flag = true;
        }
        if (this.stock > 10) {
          for (var x = 1; x <= 10; x++) {
            this.stockloop.push(x);
          }
        } else {
          for (var x = 1; x <= this.stock; x++) {
            this.stockloop.push(x);
          }
        }
      },
      error: (err) => {},
    });
  }
  addtocart() {
    if (sessionStorage.getItem('un') != null) {
      var tcost = Number(this.qty) * this.reamt;
      var mydata = {
        prodid: this.prodid,
        prodname: this.pname,
        rate: this.reamt,
        qty: this.qty,
        totalcost: tcost,
        picture: this.ppic,
        username: sessionStorage.getItem('un'),
      };
      this.cartobj.savetocart(mydata).subscribe(
        // else{
        {
          next: (resp) => {
            if (resp == 'success') {
              this.myrouter.navigateByUrl('/showcart');
              alert('item added');
            } else {
              this.msg = 'Problem while adding to cart';
            }
          },
          error: (err) => {
            this.msg = err;
          },
        }
      );
    } else {
      this.myrouter.navigateByUrl('/signin?pid=' + this.prodid);
    }
  }
  prodcheck() {
    this.cartobj
      .fetchcartbyitem(this.prodid, sessionStorage.getItem('un'))
      .subscribe({
        next: (res: any[]) => {
          if (res.length > 0) {
            this.qty = res[0].qty;
            this.buttonflag = true;
          } else {
            this.qty = '';
            this.buttonflag = false;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  updatecart() {
    var newtotcost = Number(this.qty) * this.reamt;

    var mydata = {
      pid: this.prodid,
      un: sessionStorage.getItem('un'),
      ncost: newtotcost,
      qty: this.qty,
    };
    this.cartobj.updatecartitem(mydata).subscribe({
      next: (resp) => {
        if (resp['nModified'] == 1) {
          this.myrouter.navigateByUrl('/showcart');
        } else {
          alert('not updated');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // preview(files) {
  //   if (files.length === 0) return;

  //   var mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = 'Only images are supported.';
  //     return;
  //   }

  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     //this.imgURL = reader.result;
  //     this.previewImageSrc = reader.result;
  //     this.zoomImageSrc = reader.result;
  //   };
}
// }
