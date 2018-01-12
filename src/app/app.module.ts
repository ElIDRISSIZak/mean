import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { TaskService } from './tasks/task.service';
import { TaskComponent } from './tasks/tasks.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginModule } from './login/login.module';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthentificationComponent } from './auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TreeView} from './test/tree-view';
import {MyDemoApp} from './test/app';
import { AdminService } from './admin/admin.service';
import { AdminComponent } from './admin/admin.component';
//uploading File
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,TaskComponent,LoginComponent,NotFoundComponent,HomeComponent,AuthentificationComponent, TreeView, MyDemoApp, AdminComponent, 		FileSelectDirective , FileDropDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule                     // <Add Module: 
  ],
  providers: [DataService, TaskService , AdminService], // <-Add Services
  bootstrap: [AppComponent]
})
export class AppModule { }
