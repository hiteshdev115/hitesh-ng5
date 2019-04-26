import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../auth/data.service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: '../view/editproduct.component.html'
})
export class EditProductComponent implements OnInit {
    checklogin:any;
    getCurrentUser:any;
  	model: any = {};
    
    id:any;
    productName:any;
    description:any;
    price:any;
    
    url = '';
    productImage:any;
    
    constructor(public router: Router,
        private route: ActivatedRoute,
        public _dataService: DataService,
        public _authService: AuthService) {

        this.model = {
              id:'',
              productName: '',
              description: '',
              price: '',
              submitted:false
          };
    }
    
    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id'); //get id from url
      this._dataService.getProductDetails(this.id).then((res) => {
        if (res.success) {
                    console.log(res.data[0]);
                    this.model.id = res.data[0].id;
                    this.model.productName = res.data[0].productName;       
                    this.model.description = res.data[0].description;                    
                    this.model.price = res.data[0].price;
                    if(res.data[0].image != ''){
                      this.url = '/assets/profile/'+res.data[0].image;
                    }
                    console.log(this.url);
                } else {
                    console.log('error in get product data');
                    this.model.id = '';
                    this.model.productName = '';
                    this.model.description = '';
                    this.model.price = '';
                    this.url = '';
                }
        });
    }

    productImageUpload(event) {
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
    }

    saveProduct(postData) {
        console.log(postData);
        //this._dataService.saveprofile(postData,this.profile_pic).then((res) => {
        this._dataService.saveProduct(postData, this.productImage).then((res) => {
                if (res.success) {
                    this.router.navigate(['/admin/product']);
                } else {
                  console.log('error');
                }
        });
    }

    unlinkProductImage(id){
      console.log(id);
      this.url = '';
      this._dataService.unlinkProductImage(id).then((res) => {
            if (res.success) {
                this.url = '';
                //this.router.navigate(['/product']);
            } else {
              console.log('error');
            }
      });
    }

    
}
