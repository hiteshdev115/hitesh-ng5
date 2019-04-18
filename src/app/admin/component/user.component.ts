import { Component, OnInit, Inject } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../auth/data.service';

import { User } from '../component/user'; //interface
import { ResourceLoader } from '@angular/compiler';
import { Location } from '@angular/common';
import { DialogBodyComponent } from '../component/dialog-body/dialog-body.component';

import {
	MatDialog,
	MatDialogConfig
  } from "@angular/material";


@Component({
	//selector: 'app-login',
	  templateUrl: '../view/user.component.html',
	  
 })
export class UserComponent {	

		checklogin:any;
		getUserList:any;
		model: any = {};
		//modalTitle:string;
		getCurrentUser:any;
		public user : User[] = []; 
		public userObservable : Observable<User[]> ;
		selectedAll: any; 
		userArray:any;
		
		headText: string;
		titleText: string;
		descText: string;
		empid:any;

		constructor(
			public router: Router,
			public _dataService: DataService,
			public _authService: AuthService,
			private location: Location,
			private dialog: MatDialog,
			) {
				//console.log('user component');
				//this.modalTitle = 'tester';
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

		openDialog(id:any): void {
			this.headText = 'Delete Confirmation';
			this.titleText = 'Are you sure you want to delete this data?';
			this.descText = 'if ignore then click close';
			//console.log('in opendialog===>'+id);
			this.empid = id;
			const dialogRef = this.dialog.open(DialogBodyComponent, {
				width: '100%',
				maxWidth:'100%',
				data: {eid:this.empid, head: this.headText, title: this.titleText, desc:this.descText}
			});
			dialogRef.afterClosed().subscribe(result => {
				//this.fetchEmployeeData();	
			});
		}
		
		
		


    
}
