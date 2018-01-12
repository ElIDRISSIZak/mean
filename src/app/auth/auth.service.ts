import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  result:any;

  constructor(private _http: Http) { }

  
 /* login(user:any){
    var headers = new Headers();
    headers.append('content-type','application/json');
    return this._http.post('http://localhost:3000/api/login', JSON.stringify(user), {headers:headers})

          .map(res => res.json());
	   	
}  */
}
