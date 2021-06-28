import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private server_url: string = environment.HOST_LINK_ADDRESS;
  readonly login_url: string = 'api/login/';
  readonly register_url: string = 'api/register/';
  readonly logout_url: string = 'api/logout/';
  
  
  constructor(private http: HttpClient) {

  }

  authLogin(data: { email: string, password: string }) {

    const headers = { 'Content-Type': 'application/json',};
    var url: string = this.server_url + this.login_url;
    return this.http.post(url, data, {headers, responseType:'json', observe:'response'});
  }

  authRegister(data: { name: string, email: string, password: string }) {
    const headers = { 'Content-Type': 'application/json',};
    var url: string = this.server_url + this.register_url;
    return this.http.post(url, data, {headers, responseType:'json', observe:'response'});
  }

  authLogout() {
    var url: string = this.server_url + this.logout_url;
    return this.http.get(url);
  }


}
