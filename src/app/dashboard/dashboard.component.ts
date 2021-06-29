<<<<<<< HEAD
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

=======
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
>>>>>>> eee116d98d18ceda4d1ba84cf62a50d1cd857c3e
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  public username:any = "USER"
  public alert:string = ""

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
          
          console.log("user not authenticated")
          this.router.navigate(['/login'])
        }
      }
    })
  }

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Current Vallue',
          data: [0, 20, 40, 50],
          backgroundColor: "rgb(115 185 243 / 65%)",
          borderColor: "#007ee7",
          fill: true,
        },
        {
          label: 'Invested Amount',
          data: [0, 20, 40, 60, 80],
          backgroundColor: "#47a0e8",
          borderColor: "#007ee7",
          fill: true,
        }],
        labels: ['January 2019', 'February 2019', 'March 2019', 'April 2019']
      },
    });
  }
}
