import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../auth/data.service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: '../view/adduser.component.html'
})
export class AdduserComponent implements OnInit {
    checklogin:any;
    getCurrentUser:any;
  	model: any = {};
    
    name:any;
    city:any;
    id:any;
    url = '';
    profile_pic:any;
    
    constructor(public router: Router,
        private route: ActivatedRoute,
        public _dataService: DataService,
        public _authService: AuthService) {

        this.model = {
              id:'',
              name: '',
              city: '',
              submitted:false
          };
    }
    
    ngOnInit() {
      
    }

    fileUpload(event) {
        var files = event.target.files;
        //console.log(files);
        this.profile_pic = files;
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();

          reader.readAsDataURL(event.target.files[0]); // read file as data url
 
          reader.onload = (event) => { // called once readAsDataURL is completed
              this.url = '';//event.target.result;
          }
        }
        
    }

    saveEmployeeData(postData) {
        console.log(postData);
        //this._dataService.saveprofile(postData,this.profile_pic).then((res) => {
        this._dataService.saveEmployeeDetails(postData).then((res) => {
                if (res.success) {
                    this.router.navigate(['/admin/user']);
                } else {
                  console.log('error');
                }
        });
    }    
}
