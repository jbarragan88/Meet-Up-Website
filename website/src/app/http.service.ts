import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppModule } from './app.module';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  // addProduct(product){
  //   return this._http.post('/api/create', product);
  // }
  
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
