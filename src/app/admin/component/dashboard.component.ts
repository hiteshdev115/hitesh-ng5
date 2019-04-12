import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
	//selector: 'app-login',
  	templateUrl: '../view/dashboard.component.html'
 })
export class DashboardComponent {
	constructor() {
		console.log('Dashboard Component');
	}
}
