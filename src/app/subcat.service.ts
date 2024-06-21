import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conn} from './conn';

@Injectable({
  providedIn: 'root'
})

export class SubcatService {

  constructor( private myhttp:HttpClient) { }
  addsubcat2db(mydata){
    return this.myhttp.post(Conn.nodeurl+"/api/addsubcat",mydata,{responseType:"text"});
  }
  
  // showsubcat
  fetchsubcatbyid(catid){
    return this.myhttp.get(Conn.nodeurl+"/api/getallprod?cid=" +catid,{responseType:"json"});
  }
  
 

 // updatedata
 fetchsubcatdetailsbyid(subcatid){
  return this.myhttp.get(Conn.nodeurl+"/api/fetchsubcatdetails?scid=" + subcatid,{responseType:"json"});
}

subcatupdate(updatedata){
  return this.myhttp.put(Conn.nodeurl+"/api/updatesubcat",updatedata,{responseType:"json"})
}
}