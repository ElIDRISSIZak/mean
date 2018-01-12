import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthentificationComponent } from './auth/auth.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskComponent } from './tasks/tasks.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MyDemoApp} from './test/app';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'tasks', component: TaskComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'authaaaaaa', component: LoginComponent },
  { path: 'login', component: AuthentificationComponent },
  { path: 'welcome', component: HomeComponent },
  { path: '', component: MyDemoApp },  
  { path: '**', component: NotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
