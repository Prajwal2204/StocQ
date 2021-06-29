import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
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
