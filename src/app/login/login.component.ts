import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login_alert:string = ""
  public register_alert:string = ""
  constructor(private auth:AuthService, 
              private router:Router,
              private cookie:CookieService
              ) { }

  
  Login(data:{email:string, password:string}){

    this.auth.authLogin(data).subscribe({
      next:res =>{
        if(res.status == 200){
          console.log(res)
          var temp:string|null = res.headers.get('auth-token')
          console.log(temp)
          this.cookie.put("auth-token", temp ? temp : undefined, {secure:true, httpOnly:true})

  
          

          //this.router.navigate(['/home']);
        }
        else{
          alert(res.body)
        }

      },
      error: error=>{
        console.log(error);
        if(error.status == 403){
          this.login_alert = error.error.detail;
        }
        else{
          console.log(error)
          alert("There was a problem, Please Try Again!")
        }
      }
    });
  }

  Register(data:{name:string, email1:string, password1:string}){

    var temp:{name:string, email:string, password:string} = {
      "name" : data.name,
      "email" : data.email1,
      "password": data.password1,
    }

    this.auth.authRegister(temp).subscribe({
      next: res =>{
        console.log(res)
        if(res.status == 200){
          console.log(res.body)
          
        }
        else{
          alert(res.body)
        }

      },
      error: error=>{
        console.log(error)
        if(error.status == 403){
          this.register_alert = error.error.detail;
        }
        else{
          console.log(error)
          alert("There was a problem, Please Try Again!")
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
