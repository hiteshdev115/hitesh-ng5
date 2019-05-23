import {Injectable,Input, Output, EventEmitter} from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

import { from } from 'rxjs';
import { of } from 'rxjs';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap, delay } from 'rxjs/operators';



import { HttpService } from '../http_serv/http.service';

@Injectable()

export class DataService {
    loginuserData:any;
    loginEmail:any = {};
    isLoggedIn: boolean = false;
    baseUrl:string;
    constructor(private _http: HttpClient, private _httpService:HttpService) {
        this.baseUrl  = 'http://localhost:3000/api/';
        this.loginuserData = JSON.parse(localStorage.getItem("loginUser")); 
        this.loginEmail = {
                email: this.loginuserData['data']['email']
            };
    }

    saveprofile(postData: any = [], files: File[]) {
        
        var headerToken = this._httpService.createAuthorizationHeader();
        
        let formdata = new FormData();
        formdata.append("profile_pic", files[0]);
        if (postData) {
            for (var key in postData) {
                var value = postData[key];
                //console.log(key+'====='+ value);
                formdata.append(key, value);
            }
        }
        //console.log("======Form Data =====");
        var aa = formdata.get('profile_pic');
        //console.log(aa);
        return <any>new Promise((resolve, reject) => {
                this._http.post(this.baseUrl + "saveUser", formdata, {headers:headerToken}).subscribe(
                res => {
                    var resData = res;
                    resolve(resData);
                },
                error => {
                    reject(error);
                }
            )
        })    
    }

    getUserDetails() {
        var user = JSON.parse(localStorage.getItem('loginUser'));
        var email = user.data.email;
        //console.log('getUserDetails==>'+email);
        return <any>new Promise((resolve, reject) => {
                this._http.post(this.baseUrl + "getUserDetails", {email:email}).subscribe(
                res => {
                    var resData = res;
                    resolve(resData);
                },
                error => {
                    reject(error);
                }
            )
        })       
    }

    unlinkProfile(id){
       return <any>new Promise((resolve, reject) => {
                this._http.post(this.baseUrl + "unlinkimage", {id:id}).subscribe(
                res => {
                    var resData = res;
                    resolve(resData);
                },
                error => {
                    reject(error);
                }
            )
        })     
    }
}