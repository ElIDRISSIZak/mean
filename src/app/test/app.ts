import {Component , OnInit , OnDestroy} from '@angular/core';
import{TreeView} from './tree-view';
import {Directory} from './directory';
import {Classification} from './classification';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
    selector: 'my-tree-view',
    template: '<tree-view *ngIf="Classification" [Classification]="Classification"></tree-view>'
})
export class MyDemoApp implements OnInit {
    directories: Array<Directory>;
    Classification: Classification[];
    classification: any[] = [];
    
    result: any;

    constructor( private _http: Http) {}
    ngOnInit(){
        
        this.getData();
    }
    getData():void {
        this._http.get("/api/test2")
        .map(Classification => <Classification[]>Classification.json())        
         .subscribe(Classification =>{
	   setTimeout(()=>{ this.Classification = Classification }, 4000),
	   this.Classification = Classification,
         console.log("Inside sucscribe from app.ts",this.Classification)
	});
         
     }
}
