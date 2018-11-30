import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
const apiUrl = "http://138.68.12.41:8007/api/";
const imageurl = "http://138.68.12.41:8007/media/";
const mediaurl = "http://138.68.12.41:8007/";

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
  
  }

  post(link, data){
    let formData:FormData = new FormData();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'my-auth-token'
      })
    };
    var dataPass = this.convertUrl(data);
  	return this.http.post(apiUrl+link+'/', dataPass, httpOptions).map(response => {
      	return response;
    });
  }

  convertUrl(data) {
      let str = [];
      for(var key in data){
        var value = data[key];
        str.push(key+'='+value);
      }
      return str.join('&');
  }
}
