import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dash_service:DashboardService) { }

  ngOnInit(): void {
    this.dash_service.dashboard_init().subscribe({
      next:data=>{
        console.log(data)
      },
      error:error=>{
        console.log(error)
      }
    })
  }

}
