import { Observable, Subject, pipe } from 'rxjs';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'admin-header',
  templateUrl: '../view/header.component.html'
})
export class HeaderComponent {
	constructor(private router: Router, private authenticationService: AuthService) {
	    console.log('admin header');
	}

	logout()
	{
		this.authenticationService.logout();
		this.router.navigate(['/admin/login']);
	}
  
}
