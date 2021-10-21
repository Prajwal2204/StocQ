import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public alert:string = ""
  private readonly notifier: NotifierService;
  constructor(private auth:AuthService, 
              private router:Router,
              private notifierService:NotifierService
              ) { 
                this.notifier = notifierService;
              }

  Login(data:{email:string, password:string}){

    this.auth.authLogin(data).subscribe({
      next:res =>{
        if(res.status == 200){ 
          console.log("Login Success!")
          this.notifier.notify('success', "Login Successful")
          this.router.navigate(['/backtest']);
        }
        else{
          alert(res.body)
        }

      },
      error: error=>{
        console.log(error);
        if(error.status == 403){
          this.alert = error.error.detail;
          this.notifier.notify('error', error.error.detail)
        }
        else{
          console.log(error)
          this.notifier.notify('error', "ERROR")
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
        if(res.status == 200){
          console.log("Login Success!")
          this.notifier.notify('success', "Registered Successfully")
          this.router.navigate(['/backtest']);
          
        }
        else{
          alert(res.body)
        }

      },
      error: error=>{
        console.log(error)
        if(error.status == 403){
          this.notifier.notify('error', error.error.detail)
          this.alert = error.error.detail;
        }
        else{
          console.log(error)
          this.notifier.notify('error', "ERROR")
          alert("There was a problem, Please Try Again!")
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
