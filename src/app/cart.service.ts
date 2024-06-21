import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conn } from './conn';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private myhttp: HttpClient) {}

  savetocart(data) {
    return this.myhttp.post(Conn.nodeurl + '/api/addcart', data, {
      responseType: 'text',
    });
  }
  fetchcart(un) {
    return this.myhttp.get(Conn.nodeurl + '/api/fetchingcart?uname=' + un, {
      responseType: 'json',
    });
  }

  fetchcartbyitem(pid, un) {
    return this.myhttp.get(
      Conn.nodeurl + '/api/fetchcartbyitem?pid=' + pid + '&un=' + un,
      {
        responseType: 'json',
      }
    );
  }
  updatecartitem(data) {
    return this.myhttp.put(Conn.nodeurl + '/api/updatecartitem', data, {
      responseType: 'json',
    });
  }

  savetocheckout(data) {
    return this.myhttp.post(Conn.nodeurl + '/api/checkout', data, {
      responseType: 'text',
    });
  }
  fetchorderid(uname) {
    return this.myhttp.get(Conn.nodeurl + '/api/getordernum?un=' + uname, {
      responseType: 'json',
    });
  }

  updatestock(updtitems: any[]) {
    return this.myhttp.put(Conn.nodeurl + '/api/updatestock', updtitems, {
      responseType: 'text',
    });
  }
  saveorderprods(orderitems) {
    return this.myhttp.post(Conn.nodeurl + '/api/orderitems', orderitems, {
      responseType: 'text',
    });
  }
  delcart(un) {
    //alert(id);
    return this.myhttp.delete(Conn.nodeurl + '/api/emptycart?un=' + un, {
      responseType: 'text',
    });
  }

  fetchuserorder(uname) {
    return this.myhttp.get(Conn.nodeurl + '/api/getuserorders?un=' + uname, {
      responseType: 'json',
    });
  }
  fetchorderprods(oid) {
    return this.myhttp.get(Conn.nodeurl + '/api/getorderprods?oid=' + oid, {
      responseType: 'json',
    });
  }
  fetchallorders() {
    return this.myhttp.get(Conn.nodeurl + '/api/getallorders', {
      responseType: 'json',
    });
  }
}
