import { Observable, Subject, pipe } from 'rxjs';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: '../../view/common/header.component.html'
})
export class HeaderComponent {
	
	public mnu_aboutus = 'aboutus';
	public mnu_gallery = 'gallery';
	public mnu_contactus = 'contactus';
	public mnu_login = 'login';
	public mnu_profile = 'profile';

	userName: string;
	logUserData:any;

	public isLoggedIn:boolean = false;

	@Input() public isUserLoggedIn: boolean;

	@Output() public newValue: EventEmitter<string> = new EventEmitter();

	constructor(private router: Router, private authenticationService: AuthService) {
	    authenticationService.getLoggedInName.subscribe(name => this.changeName(name));
			this.getChange();
	}
	getChange(name:string ='')
	{
		if(name == '')
		{
			this.userName = this.authenticationService.getLoginUserInfo();
		}
		else
		{
			this.userName = name;
		}
	//console.log(this.username);
	}
	public changeName(name: string): void {
	    this.getChange(name);
	}
	logout()
	{
		this.userName = '';
		this.authenticationService.logout();
	this.router.navigate(['/login']);
	}
  
}
