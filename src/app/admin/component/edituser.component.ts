import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../auth/data.service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: '../view/edituser.component.html'
})
export class EdituserComponent implements OnInit {
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
      //this.checklogin = this._authService.getLoginUserInfo();
      this.id = this.route.snapshot.paramMap.get('id');
      //this.getCurrentUser = this._dataService.getUserDetails();
      console.log('update');
      this._dataService.getUserDetails(this.id).then((res) => {
                if (res.success) {
                    //console.log(res);
                    this.model.id = res.data[0].id;
                    this.model.name = res.data[0].employeeName;       
                    this.model.city = res.data[0].city;                    
                    this.model.contactno = res.data[0].phone;
                    /*if(res.data[0].profile_pic != ''){
                      this.url = '/assets/profile/'+res.data[0].profile_pic;
                    }*/
                } else {
                    console.log('error in get profile data');
                    this.model.id = '';
                    this.model.name = '';
                    this.model.city = '';
                    this.model.contactno = '';
                    //this.url = '';
                }
        });
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

    saveEmployee(postData) {
        console.log(postData);
        //this._dataService.saveprofile(postData,this.profile_pic).then((res) => {
        this._dataService.saveEmployee(postData).then((res) => {
                if (res.success) {
                    this.router.navigate(['/admin/user']);
                } else {
                  console.log('error');
                }
        });
    }

    unlinkProfile(id){
      console.log(id);
      this.url = '';
      this._dataService.unlinkProfile(id).then((res) => {
            if (res.success) {
                this.url = '';
                this.router.navigate(['/profile']);
            } else {
              console.log('error');
            }
      });
    }

    
}
