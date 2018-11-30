import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { Config } from './../../config';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  apiUrl = Config.baseUrl;
  constructor(
    public http: Http,
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }
  public details ;
  postData(credentials, type) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    console.log(credentials);
    console.log(type);
    return new Promise((resolve, reject) => {
     // let headers = new Headers();

      this.http.post(this.apiUrl + type, JSON.stringify(credentials))
        .subscribe(res => {
          console.log(res);
          resolve(res.json());
          loading.dismiss();
        }, (err) => {
          console.log(err);
          reject(err);
          loading.dismiss();
        });
    });

  }

  signup(data:object):Observable<any>{
    console.log(data);
    return this.http.post(this.apiUrl +'users/register.json',data).map((res:Response)=>{
      return res.json();
    });
  }

  login(data: object): Observable<any> {
    console.log(data);
    return this.http.post(this.apiUrl +'users/token.json', data).map((res: Response) => {
      return res.json();
    });
  }

  forgetpass(data: object): Observable < any > { 
      return this.http.post(this.apiUrl +'users/forgotpassword.json', data).map((res: Response) => {
        return res.json();
      });
   }

   getdetails(data: object): Observable<any> {
    let requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'userprofile',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
    
  }

  updateprofile(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'users/edituserprofile.json', data).map((res: Response) => {
      return res.json();
    });
  }
 
  changepass(data: object): Observable<any> {
    
    let requestchangeoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'users/changepassword.json',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestchangeoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
  }

  getboozelist(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'products/boozelist.json', data).map((res: Response) => {
      return res.json();
    });
  }

  getsubboozelist(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'products/subboozelist.json', data).map((res: Response) => {
      return res.json();
    });
  }

  getproductlist(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'products/productlist.json', data).map((res: Response) => {
      return res.json();
    });
  }

  getproductdetails(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'products/productDetails.json', data).map((res: Response) => {
      return res.json();
    });
  }

  userProducts(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'products/userProducts.json', data).map((res: Response) => {
      return res.json();
    });
  }

  deleteProduct(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'products/deleteProduct.json', data).map((res: Response) => {
      return res.json();
    });
  }

  orderProduct(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'products/addOrder.json', data).map((res: Response) => {
      return res.json();
    });
  }

  pendingOrder(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'products/listOrderPending.json', data).map((res: Response) => {
      return res.json();
    });
  }

  arrivingOrder(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'products/listOrderArriving.json', data).map((res: Response) => {
      return res.json();
    });
  }

  pastOrder(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'products/listOrderPast.json', data).map((res: Response) => {
      return res.json();
    });
  }

  changeStatus(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'products/changeStatus.json', data).map((res: Response) => {
      return res.json();
    });
  }


   


  getData(type) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    //console.log(type);
    return new Promise((resolve, reject) => {
     // let headers = new Headers();

      this.http.get(this.apiUrl + type)
        .subscribe(res => {
          //let details = res;
          //console.log(details);
          //console.log(res);
          resolve(res.json());
          loading.dismiss();
        }, (err) => {
          console.log(err);
          reject(err);
          loading.dismiss(); 
        });
    });

  }

  /*

   

  
  dealadd(data:object):Observable<any>{
    console.log(data);
    return this.http.post(this.apiUrl +'products/add_api',data).map((res:Response)=>{
      return res.json();
    });
  }


  couponadd(data:object):Observable<any>{
    console.log(data);
    return this.http.post(this.apiUrl +'coupons/add_api',data).map((res:Response)=>{
      return res.json();
    });
  }



  offlinesubscription(data:object):Observable<any>{
    console.log(data);
    return this.http.post(this.apiUrl +'packages/package_request_api',data).map((res:Response)=>{
      return res.json();
    });
  }



  getdealdetails(data: object): Observable<any> {
    let requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'products/getdealdetails_api',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
    
  }
  updatedeal(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'products/editdeal_api', data).map((res: Response) => {
      return res.json();
    });
  }



  getcoupondetails(data: object): Observable<any> {
    let requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'coupons/getcoupondetails_api',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
    
  }
  updatecoupon(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'coupons/editcoupon_api', data).map((res: Response) => {
      return res.json();
    });
  }
  */

  
}
