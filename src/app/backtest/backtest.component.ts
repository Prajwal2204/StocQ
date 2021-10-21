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
  isDisplay = true;
  isDisplay_With = true;

  private readonly notifier: NotifierService;

  constructor(private dash_service:DashboardService, private router:Router,
  private http:HttpClient, notifierService:NotifierService) {

    this.notifier = notifierService
  }

  toggleDeposit(){
    this.isDisplay = !this.isDisplay;
  }

  toggleWithdraw(){
    this.isDisplay_With = !this.isDisplay_With;
  }

  startBacktest(data:{stock_name:string}):void{
    if(data.stock_name == ""){
      console.log("Please Select A Stock")
    }
    this.dash_service.startBacktest(data.stock_name)
    
  }

  deposit(data:{amount:number}): void{
    
    let deposit_url = environment.HOST_LINK_ADDRESS + "backtest/deposit?amount=" + data.amount 

    const headers = { 'Content-Type': 'application/json',};
    this.http.get(deposit_url, {headers: headers, responseType:'json', observe:'response', withCredentials:true}).subscribe(
      {
        next:res=>{
          this.notifier.notify('success', "$" + data.amount + " Deposit Successful")
          console.log(res)
        },
        error:error=>{
          this.notifier.notify('error', "ERROR - " + error.error)
          console.log(error.error)
        }
      }
    )
  }

  withdraw(data:{amount:number}): void{
    
    let withdraw_url = environment.HOST_LINK_ADDRESS + "backtest/withdraw?amount=" + data.amount 

    const headers = { 'Content-Type': 'application/json',};
    this.http.get(withdraw_url, {headers: headers, responseType:'json', observe:'response', withCredentials:true}).subscribe(
      {
        next:res=>{
          this.notifier.notify('success', "$" + data.amount + " Withdrawal Successful")
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

    this.dash_service.dashboard_init().subscribe({
      next:data=>{
        let body = JSON.parse(JSON.stringify(data.body));
        this.username = body.username
        this.balance = Number(body.balance)
      },
      error:error=>{
        console.log(error)
        if(error.status == 403){

          console.log("User not authenticated")
          this.router.navigate(['/login'])
        }
      }
    })
  }

  ngAfterViewInit() {
  }

}
