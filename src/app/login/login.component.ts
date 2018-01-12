import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
@Component({
  selector: 'auth',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    constructor(private router: Router, private loginService: LoginService) { 
	

	}
 
    ngOnInit() {
       
    }
	
    /*login() {
        this.loading = true;
        this.loginService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    //this.alertService.error(error);
                    this.loading = false;
                });
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }*/
}
