import { Component, ViewChild, ElementRef} from '@angular/core';

import { User } from '../model/user';
import { Router } from '@angular/router';
// Import the DataService
//import { TaskService } from './task.service';

@Component({
  selector: 'welcome',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
      currentUser: User;
// @ViewChild('myCanvas') myCanvas: ElementRef;
// public context: CanvasRenderingContext2D;

  // Define a users property to hold our user data
  tasks: Array<any>;
  ifAdmin: any;


  // Create an instance of the DataService through dependency injection
  constructor( private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));    
	if (localStorage.getItem('currentUser')) {
           this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
   	   console.log(this.currentUser);
        }
	if (localStorage.getItem('ifAdmin') == "true") {
	   this.ifAdmin = true;	
   	   console.log("tes if "+localStorage.getItem('ifAdmin'));	
	}
   	   console.log(localStorage.getItem('ifAdmin'));	
  }

/*ngAfterViewInit(): void {
  this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
}*/
logout(){
  console.log(localStorage.getItem('currentUser'));    
  localStorage.removeItem('currentUser');
  this.router.navigate(['login']);
  
}  
administrer(){
    this.router.navigate(['tasks']);
  
}   
}
