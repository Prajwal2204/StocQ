import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private server_url: string = environment.HOST_LINK_ADDRESS;
  readonly dashboard_base: string = 'api/dashboard';

  constructor(private http:HttpClient) { }

  dashboard_init(){
      var url: string = this.server_url + this.dashboard_base;
      return this.http.get(url, { responseType:'json', observe:'response'});
  }

}
