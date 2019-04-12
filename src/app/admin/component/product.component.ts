import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';



import { AuthService } from '../auth/auth.service';

@Component({
	//selector: 'app-login',
  	templateUrl: '../view/product.component.html'
 })
export class ProductComponent {
		
	constructor(
		public router: Router,
        public _authService: AuthService) { 
        console.log('Product component');
        	
        }    
}
