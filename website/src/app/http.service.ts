import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppModule } from './app.module';

@Injectable()
export class HttpService {
  User_Logged_In: any;
  constructor(private _http: HttpClient) { }

  createUser(user){
    return this._http.post('/api/create/user', user);
  }
  loginUser(user){
    return this._http.get('/api/login/user', user);
  }
  success(user){
    this.User_Logged_In = user;
    return this.User_Logged_In;
  }
  
  // getProducts(){
  //   return this._http.get('/api/all/');
  // }

  // deleteProduct(id){
  //   console.log("Service Delete Product:", id)
  //   return this._http.get('/api/delete/'+ id);
  // }

  // getProduct(id){
  //   console.log("Service Get Product ID:", id)
  //   return this._http.get('/api/get/'+id);
  // }

  // editProduct(product){
  //   console.log("Service Edit Product:", product);
  //   var id = product._id
  //   return this._http.post('/api/edit/', product);
  // }

}
