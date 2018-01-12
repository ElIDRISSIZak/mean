import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../model/user';
@Injectable()
export class LoginService {

  result:any;
  currentUser: User;
  users: User[] = [];

  constructor(private _http: Http) { }

  login(username: string, password: string) {
	var headers = new Headers();
   	headers.append('content-type','application/json');
        return this._http.post('http://localhost:3000/api/login', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
               // if (user && user.token) {
                  if (user) {  
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}

