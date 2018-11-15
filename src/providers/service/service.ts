import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ServiceProvider Provider');
  }

 
  
  getCep(cep) {
    return this.http.get('http://cep.republicavirtual.com.br/web_cep.php?formato=json&cep=' + cep).map(res => res.json());
  }
  registerUser(values: string): Observable<any> {
    let body = values;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.post('http://shop-app.com.br/api/users', body, options)
      .map(res => res.json());
  }
  getBusiness() {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get('http://shop-app.com.br/api/business', options)
      .map(res => res.json());
  }
  PostLogin(values: string): Observable<any> {
    let body = values;

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://shop-app.com.br/api/authenticate/mobile', body, options)
      .map(res => res.json())
  }
  getProductsById(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get('http://shop-app.com.br/api/produtos_by_id_estab/' + id, options)
      .map(res => res.json());
  }
  getSubCatProducts(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get('http://shop-app.com.br/api/produtos_by_id_estab_grouped/' + id, options)
      .map(res => res.json());
  }
  getProductsBySubCat(id, id2) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get('http://shop-app.com.br/api/produtos_by_sub_cat/' + id + '/' + id2)
      .map(res => res.json());
  }

  registerOrder(values: string): Observable<any> {
    let body = values;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.post('http://shop-app.com.br/api/orders', body, options)
      .map(res => res.json());
  }
  registerAdress(values: string): Observable<any> {
    let body = values;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.post('http://shop-app.com.br/api/endereco', body, options)
      .map(res => res.json());
  }
  updateAddress(values: string, id): Observable<any> {
    let body = values;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.post('http://shop-app.com.br/api/endereco/' + id, body, options)
      .map(res => res.json());
  }
  getOrder(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get('http://shop-app.com.br/api/order_by_order/' + id, options)
      .map(res => res.json());
  }
  getOrderNoConfirm(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get('http://shop-app.com.br/api/order_by_order_no_confirm/' + id, options)
      .map(res => res.json());
  }
  getOrderConfirm(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get('http://shop-app.com.br/api/order_by_order_no_confirm/' + id, options)
      .map(res => res.json());
  }
  checkEndereco(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get('http://shop-app.com.br/api/endereco/' + id, options)
      .map(res => res.json());
  }

  

  deleteItemCart(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.delete('http://shop-app.com.br/api/orders/' + id, options)
      .map(res => res.json());
  }
  deleteOrder(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.delete('http://shop-app.com.br/api/delete_orders_by_order/' + id, options)
      .map(res => res.json());
  }
  getOrdersByUserNoConfirm(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get('http://shop-app.com.br/api/orders_by_user_no_confirm/' + id, options)
      .map(res => res.json());
  }
  getOrdersByUserConfirm(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get('http://shop-app.com.br/api/orders_by_user_confirm/' + id, options)
      .map(res => res.json());
  }
  getUF() {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get('http://shop-app.com.br/api/municipio_uf', options)
      .map(res => res.json());
  }
  getCity(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get('http://shop-app.com.br/api/municipio_uf_municipio/' + id, options)
      .map(res => res.json());
  }
  getNeybor(id) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get('http://shop-app.com.br/api/municipio_uf_municipio/' + id, options)
      .map(res => res.json());
  }
}
