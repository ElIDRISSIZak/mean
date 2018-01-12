import { Component } from '@angular/core';

// Import the DataService
import { TaskService } from './task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'task-root',
  templateUrl: './task.component.html'
})
export class TaskComponent {
  
  // Define a users property to hold our user data
  tasks: Array<any>;
  desc: string;
  task: any;

  // Create an instance of the DataService through dependency injection
  constructor(private _taskService: TaskService , private router: Router ) {
	if (localStorage.getItem('ifAdmin') != "true") {

	    this.router.navigate(['']);
	}
    // Access the Data Service's getUsers() method we defined
    this._taskService.getTasks()
        .subscribe(res => this.tasks = res);
  }
  
  addTask(event){
      event.preventDefault();
      if(this.desc == null){
          alert("champ obligatoire");
      }
      var newTask = {
          title : "tache X",
          desc : this.desc  
      }
      
      this._taskService.addTask(newTask)
            .subscribe(task => {
                this.task = task;
                this.tasks.push(this.task);
                this.desc = '';  
            });
      console.log(this.desc);
  }
  deleteTask(id){
    var tasks = this.tasks;
    this._taskService.deleteTask(id).subscribe(data => {
        if(data.n == 1){
            for(var i=0; i<tasks.length;i++){
                if(tasks[i]._id == id){
                    tasks.splice(i,1);
                }
            }
        } 
    });
}
}
