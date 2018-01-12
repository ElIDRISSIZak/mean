import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AdminService } from './admin.service';
// uploading File
import { FileUploader } from 'ng2-file-upload';
import { User } from '../model/user';
@Component({
  selector: 'admin-app',
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  result : any;
  sfa: any;
  public uploader:FileUploader = new FileUploader({url:'/api/upload'});
  currentUser:User;
  constructor(private _http: Http ,private _adminService: AdminService , private router: Router , private _location: Location ) {
	if (localStorage.getItem('ifAdmin') != "true") {

	    this._location.back();
	}
	this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }
   backClicked() {
        this._location.back();
    }
   insertion(){
	var number = 0;
	if (this.currentUser.structure == "manutan") {
	
		for( let item of this.uploader.queue ){
		if(item.file.name == "manutanGMC.xml" && item.isSuccess == true){
		        console.log("GOOOD"); 
			number++;
			
		}
		else if(item.file.name == "manutanSFA.xml" && item.isSuccess == true){
		        console.log("GOOOD"); 
			number++;
			
		}
		/*else if(item.file.name == "Spécification fichier Mapping Tool V0.1.xlsx" && item.isSuccess == true){
			this._http.get("/api/insertion")
      			.map(result => this.result = result.json().data)
			.subscribe(res => this.result = res);
			alert("EXCEL Bien Chargé !!!!!");
		}*/

		else if(item.isSuccess == false){
			alert("Erreur : Veuillez charger le fichier tout d'abord");
		}

		console.log("=>", this.result);
		}
		if(number == 2){
			confirm("Integration données MANUTAN GMC et SFA ");
			this._http.get("/api/insertion")
      				.map(result => this.result = result.json().data)
				.subscribe(res => this.result = res);
			this._http.get("/api/insertionsfa")
      				.map(sfa => this.sfa = sfa.json().data)
				.subscribe(sfa => this.sfa = sfa);		
			alert("Données MANUTAN Bien Chargés!!!!!");	
		}else
			alert("Veuillez charger les deux fichiers MANUTAN GMC et SFA ");
	}else if(this.currentUser.structure == "filiale1") {
		//confirm("Integration données de la filiale 1");
		for( let item of this.uploader.queue ){
		if(item.file.name == "filiale1.xlsx" && item.isSuccess == true){
		        console.log("GOOOD"); 
			alert("Fichier bien chargé");
		}
		else if(item.isSuccess == false){
			alert("Erreur : Veuillez charger le fichier tout d'abord");
		}
		else{
			alert("Erreur : Veuillez charger le fichier de filiale ");
		}

		console.log("=>", this.result);
		}
	}else
		alert("Erreur : Pas d autorisation ");
}
    
   uploadAll(){
	if (this.currentUser.structure == "manutan") {
		for( let item of this.uploader.queue ){
		if( item.file.name == "manutanGMC.xml" || item.file.name == "manutanSFA.xml"   ){
			item.upload();
		}
		else{
			item.isError = true;	
		}
	}}
	else if (this.currentUser.structure == "filiale1"){
		for( let item of this.uploader.queue ){
		if(item.file.name == "filiale1.xlsx"    ){
			item.upload();
		}
		else{
			item.isError = true;	
		}
	}
	}
	//this.uploader.uploadAll();
   }
   upload(item : any){
	if (this.currentUser.structure == "manutan") {
		if( item.file.name == "manutanGMC.xml" || item.file.name == "manutanSFA.xml"){
			item.upload();
		}else{
			item.isError = true;	
		}
	}else if (this.currentUser.structure == "filiale1"){
		if( item.file.name == "filiale1.xlsx"){
			item.upload();
		}else{
			item.isError = true;	
		}
	}
	
   }	
  
  
}
