import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../auth/data.service';

import { User } from '../component/user'; //interface
import { ResourceLoader } from '@angular/compiler';
import { Location } from '@angular/common';
import { ConfirmationDialogService } from '../auth/confirmation-dialog.service';

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
		selectedAll: any; 
		userArray:any;
		
		constructor(
			public router: Router,
			public _dataService: DataService,
			public _authService: AuthService,
			private location: Location,
			private confirmationDialogService: ConfirmationDialogService) {
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
			this.fetchEmployeeData();
			
		}
		fetchEmployeeData()
		{
			console.log('Fetchdata');
			this._dataService.get_users().subscribe((res : User[])=>{
				
				this.user = res;
				this.userArray = res;
				console.log(this.userArray['data'].length);
			});
		}
		addNew(){
			this.router.navigate(['/admin/user/add']);
		}

		/*selectAll() {
			for (var i = 0; i < this.userArray['data'].length; i++) {
				this.userArray['data'][i].selected = this.selectedAll;
			}
		  }
		  checkIfAllSelected() {
			this.selectedAll = this.userArray['data'].every(function(item:any) {
				return item.selected == true;
			  })
		  }*/

		deleteEmployee(id:any) {
			console.log('Employee id deom user component ==>'+id);
			if (window.confirm("Please confirm?")) {	
				this._dataService.deleteEmployee(id).subscribe((Response)=>{
					//console.log(Response['success']);
					if(Response['success'] == true)
					{
						this.fetchEmployeeData();
					}
				});
			} else {

			}
		};

		public openConfirmationDialog() {
			this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
			.then((confirmed) => console.log('User confirmed:', confirmed))
			.catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
		  }

    
}
