import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from './account';
import { Conn } from './conn';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private myhttp: HttpClient) {}

  save2db(obj: Account): any {
    return this.myhttp.post(Conn.nodeurl + '/api/signup', obj, {
      responseType: 'text',
    });
  }

  updatepass(databody) {
    return this.myhttp.put(Conn.nodeurl + '/api/updatepass', databody, {
      responseType: 'json',
    });
  }

  getuser(data) {
    return this.myhttp.get(Conn.nodeurl + '/api/getuser?user=' + data, {
      responseType: 'json',
    });
  }

  fetchacode(data) {
    return this.myhttp.put(Conn.nodeurl + '/api/getacode?ac=' + data, {
      responseType: 'json',
    });
  }
}
