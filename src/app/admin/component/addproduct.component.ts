import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../auth/data.service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: '../view/addproduct.component.html'
})
export class AddproductComponent implements OnInit {
    checklogin:any;
    getCurrentUser:any;
  	model: any = {};
    
    id:any;
    productName: '';
    description: '';
    price:'';
    url = '';
    urls = [];
    productImage:any;
    
    constructor(public router: Router,
        private route: ActivatedRoute,
        public _dataService: DataService,
        public _authService: AuthService) {

        this.model = {
              id:'',
              productName: '',
              description: '',
              price:'',
              submitted:false
          };
    }
    
    ngOnInit() {
      
    }

    /*productImageUpload(event) {
        var files = event.target.files;
        this.productImage = files;
        //console.log(event.target.files[0]);
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]); // read file as data url
          reader.onload = (event) => { // called once readAsDataURL is completed
              this.url = '';//event.target.result;
          }
        }
        
    }*/
    productImageUpload(event) {
      var files = event.target.files;
      
      this.productImage = files;
      console.log(this.productImage);
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
          reader.onload = (event:Event & {target: {result:string}}) => {
            //console.log(event.target.result);
             this.urls.push(event.target.result); 
          }
          reader.readAsDataURL(event.target.files[i]);
        }
      }      
    }

    saveProductData(postData) {
        this._dataService.saveProductDetails(postData, this.productImage).then((res) => {
                if (res.success) {
                    //this.router.navigate(['/admin/product']);
                } else {
                  console.log('error');
                }
        });
    }    
}
