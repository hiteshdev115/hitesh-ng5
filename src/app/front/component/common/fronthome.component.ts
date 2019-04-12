import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
	//selector: 'app-home',
  	templateUrl: '../../view/common/index.component.html'
 })
export class FronthomeComponent {
	constructor() {
		console.log('Front Home Component');
	}
}
