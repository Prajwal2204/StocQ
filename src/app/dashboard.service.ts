import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private server_url: string = environment.HOST_LINK_ADDRESS;
  readonly dashboard_base: string = 'backtest/balance/';
  constructor(private http:HttpClient) { 
    

  }

  dashboard_init(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var url: string = this.server_url + this.dashboard_base;
    return this.http.get(url, {responseType:'json', observe:'response', withCredentials:true});
  }


  startBacktest(stock_name:string):void{

      let backtest_url = this.server_url + "backtest/start?stock_name=" + stock_name
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(backtest_url, {responseType:'json', observe:'response', withCredentials:true}).subscribe({
        next:data=>{
          console.log(data.body)
        },
        error:error=>{
          console.log(error.body)
        }
      })

  }

}
