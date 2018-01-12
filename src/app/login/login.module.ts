import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpModule,FormsModule             // <-Add HttpModule
  ],
  providers: [] // <-Add DataService

})
export class LoginModule { }
