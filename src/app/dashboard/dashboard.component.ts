import { Component, Inject, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import * as apex from 'ng-apexcharts';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  stock = this.dash_service.stock_name
  init_bal = this.dash_service.initial_balance
  final_bal = this.dash_service.portfolio_values[this.dash_service.portfolio_values.length-1].toFixed(2)
  no_of_buys:any = this.dash_service.buy_dates.length
  no_of_sales:any = this.dash_service.sell_dates.length
  profit_made:any = (this.final_bal - this.init_bal).toFixed(2)
  profit_per:any = ((this.profit_made / this.init_bal) * 100).toFixed(2);


  startBacktest(data:{stock_name:string}):void{
    if(data.stock_name == ""){
      console.log("Please Select A Stock")
    }
    this.dash_service.startBacktest(data.stock_name)
    
  }
  // Line chart
  public username:any = "USER"
  public alert:string = ""
  public OHLC:any[] = [];

  public return_rates:any[] = [];
  public portfolio:any[] = [];
  public profits:any[] = [];

  // Return Rates Chart
  public lineChartData_Return: ChartDataSets[] = [
    { data: this.return_rates, label: 'Return Rates'}
  ];

  // Portfolio Value Chart
  public lineChartData_Portfolio: ChartDataSets[] = [
    { data: this.dash_service.portfolio_values, label: 'Portfolio Value'}
  ];

  public lineChartColors_Portfolio: Color[] = [
    {
      borderColor: 'rgb(221,83,83)',
      backgroundColor: 'rgba(0,0,0,0.3)'
    }
  ];

  // Inventory Prices Chart
  public lineChartData_Profits: ChartDataSets[] = [
    { data: this.profits, label: 'Profits Per Trade' }
  ];

  public lineChartColors_Profits: Color[] = [
    {
      borderColor: 'rgb(3, 240, 252)',
      backgroundColor: 'rgba(0,0,0,0.3)'
    }
  ];

  public doughnutChartLabels: Label[] = ['Buy Days', 'Sell Days'];
  public doughnutChartData: MultiDataSet = [this.no_of_buys, this.no_of_sales];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors: Color[] = [
    { backgroundColor: ['#34eb3a', '#f56042'],
    borderColor: 'rgb(0,0,0,0)' },
    
  
  ];

  public lineChartLabels_Return: Label[] = [];
  public lineChartLabels_Portfolio: Label[] = [];
  public lineChartLabels_Profits: Label[] = [];

  public lineChartOptions: ChartOptions= {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          fontColor: "white",
        }
      }

      ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: 'white',
          }
        },
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgb(83, 221, 108)',
      backgroundColor: 'rgba(0,0,0,0.3)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType= 'line';
  public lineChartPlugins = [];

  constructor(private dash_service:DashboardService, private router:Router, private http:HttpClient) {

  }

  series!: apex.ApexAxisChartSeries;
  chart!: apex.ApexChart;
  title!: apex.ApexTitleSubtitle;
  fill!: apex.ApexFill;
  xaxis!: apex.ApexXAxis;

  ngOnInit(): void {

    this.dash_service.dashboard_init().subscribe({
      next:data=>{
        let body = JSON.parse(JSON.stringify(data.body));
        this.username = body.username
        this.getOHLC(this.dash_service.stock_name)
      },
      error:error=>{
        console.log(error)
        if(error.status){

          console.log("User not authenticated")
          // this.router.navigate(['/login'])
        }
      }
    })
    
  }

  getOHLC(stock_name:string):void{
    let deposit_url = environment.HOST_LINK_ADDRESS + "backtest/ohlc?stock_name=" + stock_name

    const headers = { 'Content-Type': 'application/json',};
    this.http.get(deposit_url, {headers: headers, responseType:'json', observe:'response', withCredentials:true}).subscribe(
      {
        next:res=>{
          this.OHLC = (res.body as any).data
          console.log(res)

          for(var i=0;i<this.dash_service.return_rates.length;i++){
            if(this.dash_service.return_rates[i] != 0){
              this.return_rates.push(this.dash_service.return_rates[i])
              this.lineChartLabels_Return.push(this.OHLC[i][0])
            }
          }

          for(var i=0;i<this.dash_service.profits.length;i++){
            if(this.dash_service.profits[i] != 0){
              this.profits.push(this.dash_service.profits[i])
              this.lineChartLabels_Profits.push(this.OHLC[i][0])
            }
          }

          this.lineChartLabels_Portfolio = this.OHLC.map(d=>{
            return d[0]
          })

          let data = this.OHLC.map( c =>{
            let candle = {
              x : new Date(c[0]),
              y : [c[1], c[2], c[3], c[4]]
            }

            return candle
          })

          console.log(data)

          this.initializeChartOptions(data);

        },
        error:error=>{
          console.log(error.error)
        }
      }
    )

    
  }



  private initializeChartOptions(data:any): void{

    this.series = [{
      name: 'Candle Stick Data',
      data: data,
      color: '#f4f4f4'
    }];

    this.chart = {
      type: 'candlestick'
    };

    this.fill = {
      colors: ['#fff']
    };
    
  }


  canvas: any;
  ctx: any;

  ngAfterViewInit() {
  }
}


