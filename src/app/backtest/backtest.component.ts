import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-backtest',
  templateUrl: './backtest.component.html',
  styleUrls: ['./backtest.component.css']
})
export class BacktestComponent implements OnInit {


  public username:any = "USER"
  public balance:number = 0
  public alert:string = ""
  public isLoading:boolean = false;
  public amount:number = 0;

  private readonly notifier: NotifierService;

  constructor(private dash_service:DashboardService, private router:Router,
  private http:HttpClient, notifierService:NotifierService) {

    this.notifier = notifierService
  }

  startBacktest(data:{stock_name:string}):void{
    if(data.stock_name == ""){
      console.log("Please Select A Stock")
    }
    this.dash_service.startBacktest(data.stock_name)
    
  }

  deposit(): void{
    
    let deposit_url = environment.HOST_LINK_ADDRESS + "backtest/deposit?amount=" + this.amount 

    const headers = { 'Content-Type': 'application/json',};
    this.http.get(deposit_url, {headers: headers, responseType:'json', observe:'response', withCredentials:true}).subscribe(
      {
        next:res=>{
          this.notifier.notify('success', "$" + this.amount + " Deposit Successful")
          this.balance = (res.body as any).balance
          console.log(res)
        },
        error:error=>{
          this.notifier.notify('error', "ERROR - " + error.error)
          console.log(error.error)
        }
      }
    )
  }

  withdraw(): void{
    
    let withdraw_url = environment.HOST_LINK_ADDRESS + "backtest/withdraw?amount=" + this.amount 

    const headers = { 'Content-Type': 'application/json',};
    this.http.get(withdraw_url, {headers: headers, responseType:'json', observe:'response', withCredentials:true}).subscribe(
      {
        next:res=>{
          this.notifier.notify('success', "$" + this.amount + " Withdrawal Successful")
          this.balance = (res.body as any).balance
          console.log(res)
        },
        error:error=>{
          this.notifier.notify('error', "ERROR - " + error.error)
          console.log(error)
        }
      }
    )
  }


  ngOnInit(): void {

    this.dash_service.getloading().subscribe(load => {
      console.log(load)
      this.isLoading = load;
    })

    this.dash_service.dashboard_init().subscribe({
      next:data=>{
        let body = JSON.parse(JSON.stringify(data.body));
        this.username = body.username
        this.balance = Number(body.balance)
      },
      error:error=>{
        console.log(error)
        if(error.status){

          console.log("User not authenticated")
          this.notifier.notify('error', 'Please Login/Register!')
          this.router.navigate(['/login'])
        }
      }
    })
  }

  ngAfterViewInit() {
  }

}
