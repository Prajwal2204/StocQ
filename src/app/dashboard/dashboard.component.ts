import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  public username:any = "USER"
  public alert:string = ""


  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [60, 5, 88, 31, 46, 15, 90], label: 'Series B' }
  ];
  public lineChartLabels: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
  ];
  public lineChartOptions: ChartOptions= {
    responsive: true,
    scales: {
      xAxes: [
        
      ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(0,0,0,0)',
          },
          ticks: {
            fontColor: 'white',
          }
        }
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


  constructor(private dash_service:DashboardService, private router:Router) {

  }

  ngOnInit(): void {

    this.dash_service.dashboard_init().subscribe({
      next:data=>{
        let body = JSON.parse(JSON.stringify(data.body));
        this.username = body.username
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

  canvas: any;
  ctx: any;

  ngAfterViewInit() {
  }
}
