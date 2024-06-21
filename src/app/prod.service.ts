import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conn } from './conn';

@Injectable({
  providedIn: 'root',
})
export class ProdService {
  constructor(private myhttp: HttpClient) {}

  addproduct(proddata) {
    return this.myhttp.post(Conn.nodeurl + '/api/addproduct', proddata, {
      responseType: 'text',
    });
  }

  fetchprodbysubcatid(scatid) {
    return this.myhttp.get(
      Conn.nodeurl + '/api/fetchprodbysubcatid?scatid=' + scatid,
      { responseType: 'json' }
    );
  }
  fetchprodcatbyid(scid) {
    return this.myhttp.get(Conn.nodeurl + '/api/getproditems?scid=' + scid, {
      responseType: 'json',
    });
  }
  fetchproddetailbyid(prodid) {
    return this.myhttp.get(
      Conn.nodeurl + '/api/fetchproddetails?pid=' + prodid,
      { responseType: 'json' }
    );
  }

  productupdate(updatedata) {
    return this.myhttp.put(Conn.nodeurl + '/api/product', updatedata, {
      responseType: 'json',
    });
  }
}
