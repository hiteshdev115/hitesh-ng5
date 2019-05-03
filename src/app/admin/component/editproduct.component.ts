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
              price: '',
              submitted:false
          };
          this.productImage = '';
    }
    
    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id'); //get id from url
      this._dataService.getProductDetails(this.id).then((res) => {
        if (res.success) {
                    console.log(res);
                    this.model.id = res.data[0].id;
                    this.model.productName = res.data[0].productName;       
                    this.model.description = res.data[0].description;                    
                    this.model.price = res.data[0].price;
                    //console.log(res.images);
                    for(var i=0; i < res.images.length; i++)
                    {
                      this.urls.push({'imgId': res.images[i].id,'imgUrl':'/assets/productImages/'+res.images[i].image});
                      
                    }
                    //console.log(this.urls);
                } else {
                    console.log('error in get product data');
                    this.model.id = '';
                    this.model.productName = '';
                    this.model.description = '';
                    this.model.price = '';
                    this.urls = [];
                }
        });
    }

    productImageUpload(event) {
      var files = event.target.files;
      this.productImage = files;
      //console.log(event.target.files[0]);
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
          reader.onload = (event:Event & {target: {result:string}}) => {
            //console.log(event.target.result);
            this.urls.push({'imgUrl' : event.target.result}); 
          }
          reader.readAsDataURL(event.target.files[i]);
        }
      }      
    }

    saveProduct(postData) {
        console.log(this.productImage);
        //this._dataService.saveprofile(postData,this.profile_pic).then((res) => {
        this._dataService.saveProduct(postData, this.productImage).then((res) => {
                console.log(res);
                if (res.success) {
                    this.router.navigate(['/admin/product']);
                } else {
                  console.log('error');
                }
        });
    }

    unlinkProductImage(id){
      console.log(id);
      //this.url = '';
      this._dataService.unlinkProductImage(id).then((res) => {
            if (res.success) {
                //this.url = '';
                this.router.navigate(['/product/edit/'+id]);
            } else {
              console.log('error');
            }
      });
    }

    
}
