import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private server_url: string = environment.HOST_LINK_ADDRESS;
  readonly dashboard_base: string = 'backtest/balance/';
  public stock_name:string = "";

  public loading:any = new BehaviorSubject<boolean>(false);

  public buy_dates:any[] = [];
  public sell_dates:any[] = [];
  public inventory:any[] = [];
  public portfolio_values:any[] = [];
  public return_rates:any[] = [];
  public initial_balance:any = 0
  public final_balance:any = 0
  public profits:any[] = []

  private readonly notifier: NotifierService;

  constructor(private http:HttpClient, private router:Router, notifier:NotifierService) { 
    
    this.notifier = notifier;
  }

  getloading(): Observable<boolean> {
    return this.loading.asObservable();
  }
  setLoading(answer: boolean) {
    this.loading.next(answer);
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

      this.setLoading(true);

      this.http.get(backtest_url, {responseType:'json', observe:'response', withCredentials:true}).subscribe({
        next:data=>{
          if(data.status == 200){
            console.log(data.body)
            this.final_balance = (data.body as any).balance;
            this.initial_balance = (data.body as any).initial_portfolio_value;
            this.buy_dates = (data.body as any).buy_dates;
            this.sell_dates = (data.body as any).sell_dates;
            this.inventory = (data.body as any).inventory;
            this.return_rates = (data.body as any).return_rates;
            this.portfolio_values = (data.body as any).portfolio_values;
            this.profits = (data.body as any).profits;

            this.stock_name = stock_name

            this.router.navigate(['/dashboard'])
            this.setLoading(false);
          }
        },
        error:error=>{
          this.notifier.notify('error', error.error.message)
          console.log(error.error)
          this.setLoading(false);
        }
      })

  }

}
