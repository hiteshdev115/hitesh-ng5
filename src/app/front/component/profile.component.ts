import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../auth/data.service';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: '../view/profile.component.html'
})
export class ProfileComponent implements OnInit {
    checklogin:any;
    getCurrentUser:any;
  	model: any = {};
    
    name:any;
    contactno:any;
    email:any;
    profile:any;
    id:any;
    url = '';
    profile_pic:any;
    
    constructor(public router: Router,
        public _dataService: DataService,
        public _authService: AuthService) {

        this.model = {
              id:'',
              name: '',
              email: '',
              contactno: '',
              submitted:false
          };

    }
    
    ngOnInit() {
      //this.checklogin = this._authService.getLoginUserInfo();
      this.getCurrentUser = this._dataService.getUserDetails();
      console.log('update');
      this._dataService.getUserDetails().then((res) => {
                if (res.success) {
                    //console.log(res);
                    this.model.id = res.data[0].id;
                    this.model.name = res.data[0].name;
                    this.model.email = res.data[0].email;
                    this.model.contactno = res.data[0].contactno;
                    if(res.data[0].profile_pic != ''){
                      this.url = '/assets/profile/'+res.data[0].profile_pic;
                    }
                } else {
                    console.log('error in get profile data');
                    this.model.id = '';
                    this.model.name = '';
                    this.model.email = '';
                    this.model.contactno = '';
                    this.url = '';
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

    saveprofile(postData) {
        //console.log('==PostData==>'+postData);
        this._dataService.saveprofile(postData,this.profile_pic).then((res) => {
                if (res.success) {
                    this.router.navigate(['/profile']);
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
