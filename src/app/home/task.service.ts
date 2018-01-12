import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  result:any;

  constructor(private _http: Http) { }

  getTasks() {
    return this._http.get("/api/tasks")
      .map(result => this.result = result.json().data);
  }

  getTask() {
    return this._http.get("/api/task")
      .map(result => this.result = result.json().data);
  }
  addTask(newTask){
    var headers = new Headers();
    headers.append('content-type','application/json');
    return this._http.post('http://localhost:3000/api/task', JSON.stringify(newTask), {headers:headers})
          .map(res => res.json());
  }
  deleteTask(id){
    return this._http.delete('http://localhost:3000/api/task/'+id)
    .map(res => res.json());
  }
}