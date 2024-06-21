import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WcatService {

  constructor(private myhttp:HttpClient) { 
    this.fetchallcat();
  }
  addcat2db(mydata){
    return this.myhttp.post("http://localhost:3000/api/addwcat",mydata,{responseType:"text"});
  }

  fetchallcat(){
    return this.myhttp.get("http://localhost:3000/api/getallwcat",{responseType:"json"});
  }
  
  catupdate(mydata){
    return this.myhttp.put('http://localhost:3000/api/updatewcat', mydata, {
      responseType: 'json',
    });
  }
}
