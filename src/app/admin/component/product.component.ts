import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../auth/data.service';
import { User } from '../component/user'; //interface



@Component({
	//selector: 'app-login',
  	templateUrl: '../view/product.component.html'
 })
export class ProductComponent implements OnInit {

	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	  
	public user : User[] = []; 
	public userObservable : Observable<User[]> ;
	userArray:any;

	constructor(
		public router: Router,
		public _authService: AuthService,
		private http: HttpClient, private _dataService: DataService) { 
        console.log('Product component');
        	
		}   
	
		ngOnInit() {
			this.dtOptions = {
			  pagingType: 'full_numbers',
			  pageLength: 10,
			  processing: false,
			  lengthMenu:[10,20,40,60,80,100,500], //If you are not provide than its displying [10, 25, 50],
			  ordering: true,
			  searching: true,
			  columnDefs: [{
						"targets": [1],
						"orderable": false,
				}]
			};
			this.getProducts();
		}
		getProducts()
		{	
			this._dataService.get_products().subscribe((res : User[])=>{
				//console.log(res);
				this.user = res;
				this.userArray = res;
				this.dtTrigger.next();
				
			});
		}
		
		
		ngOnDestroy(): void {
			//this.dtTrigger.unsubscribe();
		}
}
