import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: '../../view/common/footer.component.html'
})
export class FooterComponent {
  constructor() {
	    console.log('footer');
	}
}
