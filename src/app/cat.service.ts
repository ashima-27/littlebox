import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conn} from './conn';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private myhttp:HttpClient) { 
    this.fetchallcat(); 
    
  }
  addcat2db(mydata){
    return this.myhttp.post(Conn.nodeurl+"/api/addcat",mydata,{responseType:"text"});
  }

  fetchallcat(){
    return this.myhttp.get(Conn.nodeurl+"/api/getallcat",{responseType:"json"});
  }
  
  catupdate(mydata){
    return this.myhttp.put(Conn.nodeurl+'/api/updatecat', mydata, {
      responseType: 'json',
    });
  }
}
