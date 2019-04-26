import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../auth/data.service';

import { DataTableDirective } from 'angular-datatables';

import { Product } from '../component/product'; //interface


import { DialogBodyComponent } from '../component/dialog-body/dialog-body.component'; //For custom dialog

import {
	MatDialog,
	MatDialogConfig
  } from "@angular/material";



@Component({
	//selector: 'app-login',
  	templateUrl: '../view/product.component.html'
 })
export class ProductComponent implements OnInit {
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;
	public datatableElement: DataTableDirective;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	  
	public product : Product[] = []; 
	public productObservable : Observable<Product[]> ;
	productArray:any;

	headText: string;
	titleText: string;
	descText: string;
	dialogType:string;
	prodid:any;


	productIds: any[] = [];

	constructor(
		public router: Router,
		public _authService: AuthService,
		private http: HttpClient, private _dataService: DataService,
		private dialog: MatDialog) { 
				console.log('Product component');
				this.dtOptions = {
					pagingType: 'full_numbers',
					pageLength: 5,
					processing: false,
					lengthMenu:[5,10,20,40,60,80,100,500], //If you are not provide than its displying [10, 25, 50],
					ordering: true,
					searching: true,
					columnDefs: [{
							"targets": [1],
							"orderable": false,
					}]
				};
        	
		}   
			
		ngOnInit() {			
			this.getProducts();
		}
		

		rerender_datatable() {
			this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
				//dtInstance.destroy();
				this.refresh();
				dtInstance.draw();
			});
		}
		refresh()
		{
			this._dataService.get_products().subscribe((res : Product[])=>{
				console.log(res);
				this.product = res;
				this.productArray = res;	
			});
		}

		
		getProducts()
		{	
			this._dataService.get_products().subscribe((res : Product[])=>{
				//console.log(res);
				this.product = res;
				this.productArray = res;
				this.dtTrigger.next();				
			});
		}
		
		addProduct()
		{
			this.router.navigate(['/admin/product/add']);
		}

		openDialog(id:any): void {
			this.headText = 'Delete Confirmation';
			this.titleText = 'Are you sure you want to delete this data?';
			this.descText = 'if ignore then click close';
			this.dialogType = 'delete';
			//console.log('in opendialog===>'+id);
			this.prodid = id;
			const dialogRef = this.dialog.open(DialogBodyComponent, {
				width: '100%',
				maxWidth:'100%',
				data: {eid:this.prodid, head: this.headText, title: this.titleText, desc:this.descText,type:this.dialogType}
			}).afterClosed().subscribe(result => {
				console.log('==Result==>'+result);
				if(result == 'close')
				{
					//do close
				} else {
					//delete the data
					this.deleteProduct(result);
				}
			});
		}

		deleteProduct(id:any) {
			console.log('Employee id from user component ==>'+id);
			this._dataService.deleteProduct(id).subscribe((Response)=>{
				//console.log(Response['success']);
				if(Response['success'] == true)
				{
					this.rerender_datatable();
					//this.getProducts();
					//this.router.navigate(['/admin/product/']);
				}
			});
		};

		/****** For checkbox select and delete rows *******/
		checkUncheckAll(event:any) {
			//console.log(event.target.checked);
			this.productArray['data'].forEach(x => x.state = event.target.checked);
		}

		onCheckboxChange(id:any, status:boolean) {
			if(this.productIds.indexOf(id) === -1 && status)
			{
				this.productIds.push(id);
			}
			else if(!status)
			{
				let index = this.productIds.indexOf(id);
				this.productIds.splice(index, 1);
			}
			console.log("==Array==>"+this.productIds);
		}

		deleteAll(value:any)
		{
			this.productIds = []; //make blank for rearrange id
			this.productArray['data'].forEach(value => {				
				if(value.state == true){
					this.productIds.push(value.id);
				}				
			});
			if(this.productIds.length > 0)
			{
				this.headText = 'Delete Selected Data';
				this.titleText = 'Are you sure you want to delete selected employee data?';
				this.descText = 'if ignore then click close';
				this.dialogType = 'delete';
				//console.log('in opendialog===>'+id);
				this.prodid = this.productIds;
				const dialogRef = this.dialog.open(DialogBodyComponent, {
					width: '100%',
					maxWidth:'100%',
					data: {eid:this.prodid, head: this.headText, title: this.titleText, desc:this.descText,type:this.dialogType}
				}).afterClosed().subscribe(result => {
					console.log('==Result==>'+result);
					if(result == 'close')
					{
						//do close
					} else {
						//delete the data
						console.log("delete all===>"+this.productIds);
						this.deleteSelectedProduct(result);
						
					}
				});
			} else {
				this.headText = 'Warning!';
				this.titleText = 'Please select atleast one checkbox for this action!';
				this.descText = 'if ignore then click close';
				this.dialogType = 'warning';
				//console.log('in opendialog===>'+id);
				this.prodid = this.productIds;
				const dialogRef = this.dialog.open(DialogBodyComponent, {
					width: '100%',
					maxWidth:'100%',
					data: {eid:this.prodid, head: this.headText, title: this.titleText, desc:this.descText,type:this.dialogType}
				}).afterClosed().subscribe(result => {
					console.log('==Result==>'+result);
				});
			}
		}

		deleteSelectedProduct(userId:any)
		{
			this._dataService.deleteSelectedProduct(userId).subscribe((Response)=>{
				//console.log(Response['success']);
				if(Response['success'] == true)
				{
					this.rerender_datatable();
				}
			});
		}
		/****** End of for checkbox select and delete rows *******/
}
