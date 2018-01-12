import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { DataService } from '../data.service';

@Component({
  selector: 'authentification',
  templateUrl: './auth.component.html'
})
export class AuthentificationComponent {
  model: any = {};
  currentUser : User;
  message:string;
  ifAdmin: any;
  constructor( private _http: Http , private router: Router , private _dataService: DataService ) {
	  localStorage.removeItem('currentUser');
	  localStorage.removeItem('ifAdmin');
  }
  /**
   * Log in method
   */
  login(){
    var headers = new Headers();
    headers.append('content-type','application/json');
    return this._http.post('/api/authen', JSON.stringify(this.model), {headers:headers})
	.subscribe(data => {
                if(data.json() != null && data.status == 200){
		    if((data).json().admin == true){
                        console.log("he is admin"); 
			this.ifAdmin = "true";           			
                    	localStorage.setItem('ifAdmin', this.ifAdmin);	

		    }
                    localStorage.setItem('currentUser', JSON.stringify((data).json()));
                    this.message = "Successfuly "+(<any>data).json();
                     console.log((<any>data).json()); 
		   //this._dataService.currentUser = (data).json();
		     this._dataService.sendUser((data).json());
   
                     this.router.navigate(['']);
                
                }else {
                  this.message = "Username or Password Invalid";
                  this.model = {};

                  
                }
 
                
            });

   }
  
}

