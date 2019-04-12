import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
	//selector: 'app-login',
  	templateUrl: '../view/login.component.html'
 })
export class LoginComponent implements OnInit {
	
	model: any = {};
  	checklogin : any;

	constructor(
		public router: Router,
        public _authService: AuthService) { 
        	this.model = {
	            email: '',
	            password: '',
	            submitted:false
	        };
        }

    ngOnInit() {
        // reset login status
        this.checklogin = this._authService.getLoginUserInfo();
        //console.log('===>'+this.checklogin);
        if(this.checklogin != ''){
        	this.router.navigate(['/admin/dashboard']);
        } else {
        	this._authService.logout();
        	this.router.navigate(['/admin/login']);
        }
        
    }

    login() {
    	console.log(this.model);
    	this._authService.login(this.model).then((res) => {
	            console.log(res);
	            if (res.success) {
	            	console.log(res);
	                this.router.navigate(['/admin/dashboard']);
	            } else {
	            	console.log('error');
	            }
	    });
	}
}
