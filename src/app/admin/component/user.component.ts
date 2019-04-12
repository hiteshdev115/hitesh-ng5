import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../auth/data.service';

import { User } from '../component/user'; //interface

@Component({
	//selector: 'app-login',
  	templateUrl: '../view/user.component.html'
 })
export class UserComponent {	

		checklogin:any;
		getUserList:any;
		model: any = {};
		getCurrentUser:any;
		public user : User[] = []; 
		public userObservable : Observable<User[]> ; 

		constructor(
			public router: Router,
			public _dataService: DataService,
			public _authService: AuthService) {
				//console.log('user component');
				
		}
		
		ngOnInit() {
		  //this.checklogin = this._authService.getLoginUserInfo();
		  this.getCurrentUser = this._dataService.getAllUserData();
		  console.log('get user all data in user component');
		  /*this._dataService.get_users().subscribe(userdata => {
				//console.log(userdata);
				this.getUserList = userdata;
			});*/
		
			this._dataService.get_users().subscribe((res : User[])=>{
				console.log(res);
				this.user = res;
			});
		}

    
}
