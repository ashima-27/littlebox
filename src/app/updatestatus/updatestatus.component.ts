import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { Conn} from '../conn';
@Component({
  selector: 'app-updatestatus',
  templateUrl: './updatestatus.component.html',
  styleUrls: ['./updatestatus.component.css']
})
export class UpdatestatusComponent implements OnInit {
  newstatus:string=""
  msg:string;
  orderid:string;
  constructor(private cartsrvobj:CartService
    , private myroute:ActivatedRoute, private myhttp:HttpClient) { this.myroute.queryParams.subscribe(
    {
      next:(resp)=>
      {
        this.orderid=resp["oid"];
      },
      error:()=>
      {

      }
    }
  )}

  ngOnInit(): void {
  }
  updatestatus()
  {
    var data={oid:this.orderid,nstatus:this.newstatus}
    this.myhttp.put(Conn.nodeurl+"/api/updatetorderstatus",data,{responseType:"json"}).subscribe(
      {
        next:(resp)=>
        {
          if(resp["nModified"]==1)
          {
            this.msg="Status Updated Successfully";
          }
          else
          {
            this.msg="Problem while updating";
          }
        },
        error:(err)=>
        {

        }
      }
    )
  }

}
