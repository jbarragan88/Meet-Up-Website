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
  register_user = {name: "", email: "", password: ""};
  login_user = {name: "", email: "", password: ""};
  create_error= {name: "", email: "", password: ""};
  login_error= {email: "", password: ""};
  login: any;
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
    let observable = this._httpService.createUser(this.register_user);
    observable.subscribe(data => {
      //if Creating error
      if(data["message"] == "Error"){

        this.create_error= {name: "", email: "", password: ""};

        console.log("Login Componenet Create User Data:", data);
        if(data["name"] == "Invalid"){
          this.create_error.name = "Invalid";
        }

        if(data["email"] == "Invalid"){
          this.create_error.email = "Invalid";
        }

        if(data["password"] == "Invalid"){
          this.create_error.password = "Invalid";
        }

      }
      //if no errors
      else{
          this.login = this._httpService.success(data['data'])
          this._router.navigate(['/home']);
      }
    })
  }
  //function to when user uses Login form
  loginUser(){
    console.log("Login Component Login");
    let observable = this._httpService.loginUser(this.login_user);
    observable.subscribe(data => {
      //if Login error
      if(data["message"] == "Error"){

        this.login_error= {email: "", password: ""};

        console.log("Login Componenet Login User Data:", data);
        if(data["email"] == "Invalid"){
          this.login_error.email = "Invalid";
        }

        if(data["password"] == "Invalid"){
          this.login_error.password = "Invalid";
        }

      }
      //if no errors
      else{
        this.login = this._httpService.success(data['data'])
        this._router.navigate(['/home']);
      }
    })
  }

}
