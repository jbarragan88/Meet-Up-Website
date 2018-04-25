import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {name: "", email: "", password: ""};
  create_error= {name: "", email: "", password: ""};
  login_error= {name: "", password: ""};
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
  }
  //function when user uses create form
  createUser(){
    console.log("Login Component Register");
    let observable = this._httpService.createUser(this.user);
    observable.subscribe(data => {
      //if Creating error
      if(data["message"] == "Error"){

      }
      else{

      }
    })
  }
  //function to when user uses Login form
  loginUser(){
    console.log("Login Component Login");
    let observable = this._httpService.loginUser(this.user);
    observable.subscribe(data => {
      //if Login error
      if(data["message"] == "Error"){

      }
      else{
        
      }
    })
  }

}
