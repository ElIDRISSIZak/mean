import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './model/user';

@Injectable()
export class DataService {
   
	//public currentUser: Subject<User> = new Subject<User>();	
	private currentUser = new Subject<User>();

  result:any;
   	
  constructor(private _http: Http) { }
  getUser() : Observable<User> {
  	console.log("GETTING USER");
        return this.currentUser.asObservable();
	
    }
  sendUser(user: User) {
        this.currentUser.next(user);
    }
  clearUser() {
        this.currentUser.next();
    }

  /*getUsers() {
    return this._http.get("/api/users")
      .map(result => this.result = result.json().data);
  }

  getTasks() {
    return this._http.get("/api/tasks")
      .map(result => this.result = result.json().data);
  }

  getTask() {
    return this._http.get("/api/task")
      .map(result => this.result = result.json().data);
  }*/

}
