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
		dialogType:string;
		empid:any;

		public count: number;
		public selected: string;
		userIds: any[] = [];
		masterSelected:boolean;
		checklist:any;
		checkedList:any;

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

		
		
		onCheckboxChange(id:any, status:boolean) {
			//console.log("==Array==>"+this.userIds);
			if(this.userIds.indexOf(id) === -1 && status)
			{
				this.userIds.push(id);
			}
			else if(!status)
			{
				let index = this.userIds.indexOf(id);
				this.userIds.splice(index, 1);
			}
			//console.log("==Array==>"+this.userIds);
		 }
		 
	   
		
		ngOnInit() {
		  this.getCurrentUser = this._dataService.getAllUserData();
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

		checkUncheckAll(event:any) {
			//console.log(event.target.checked);
			this.userArray['data'].forEach(x => x.state = event.target.checked);
		}

		deleteAll(value:any)
		{
			this.userIds = []; //make blank for rearrange id
			this.userArray['data'].forEach(value => {				
				if(value.state == true){
					this.userIds.push(value.id);
				}				
			});
			if(this.userIds.length > 0)
			{
				this.headText = 'Delete Selected Data';
				this.titleText = 'Are you sure you want to delete selected employee data?';
				this.descText = 'if ignore then click close';
				this.dialogType = 'delete';
				//console.log('in opendialog===>'+id);
				this.empid = this.userIds;
				const dialogRef = this.dialog.open(DialogBodyComponent, {
					width: '100%',
					maxWidth:'100%',
					data: {eid:this.empid, head: this.headText, title: this.titleText, desc:this.descText,type:this.dialogType}
				}).afterClosed().subscribe(result => {
					console.log('==Result==>'+result);
					if(result == 'close')
					{
						//do close
					} else {
						//delete the data
						console.log("delete all===>"+this.userIds);
						this.deleteSelectedEmployee(result);
						
					}
				});
			} else {
				this.headText = 'Warning!';
				this.titleText = 'Please select atleast one checkbox for this action!';
				this.descText = 'if ignore then click close';
				this.dialogType = 'warning';
				//console.log('in opendialog===>'+id);
				this.empid = this.userIds;
				const dialogRef = this.dialog.open(DialogBodyComponent, {
					width: '100%',
					maxWidth:'100%',
					data: {eid:this.empid, head: this.headText, title: this.titleText, desc:this.descText,type:this.dialogType}
				}).afterClosed().subscribe(result => {
					console.log('==Result==>'+result);
					if(result == 'close')
					{
						//do close
					} else {
						//delete the data
						console.log("delete all===>"+this.userIds);
						this.deleteSelectedEmployee(result);
						
					}
				});
			}
		}

		deleteSelectedEmployee(userId:any)
		{
			this._dataService.deleteSelectedEmployee(userId).subscribe((Response)=>{
				//console.log(Response['success']);
				if(Response['success'] == true)
				{
					this.fetchEmployeeData();
				}
			});
		}


		addNew(){
			this.router.navigate(['/admin/user/add']);
		}


		deleteEmployee(id:any) {
			console.log('Employee id from user component ==>'+id);
			this._dataService.deleteEmployee(id).subscribe((Response)=>{
				//console.log(Response['success']);
				if(Response['success'] == true)
				{
					this.fetchEmployeeData();
				}
			});
		};

		openDialog(id:any): void {
			this.headText = 'Delete Confirmation';
			this.titleText = 'Are you sure you want to delete this data?';
			this.descText = 'if ignore then click close';
			this.dialogType = 'delete';
			//console.log('in opendialog===>'+id);
			this.empid = id;
			const dialogRef = this.dialog.open(DialogBodyComponent, {
				width: '100%',
				maxWidth:'100%',
				data: {eid:this.empid, head: this.headText, title: this.titleText, desc:this.descText,type:this.dialogType}
			}).afterClosed().subscribe(result => {
				console.log('==Result==>'+result);
				if(result == 'close')
				{
					//do close
				} else {
					//delete the data
					this.deleteEmployee(result);
				}
			});
		}
		
		
		


    
}
