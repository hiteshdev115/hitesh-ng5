import {Injectable,Input, Output, EventEmitter} from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';


import { of } from 'rxjs';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap, delay } from 'rxjs/operators';
//import { of } from 'rxjs';
import { from } from 'rxjs';
import { HttpService } from '../http_serv/http.service';



@Injectable()

export class DataService {
    loginuserData:any;
    loginEmail:any = {};
    isLoggedIn: boolean = false;
    baseUrl:string;
    userdata:any;
    
    constructor(private _http: HttpClient, private _httpService:HttpService) {
        this.baseUrl  = 'http://localhost:3000/admin/';
        this.loginuserData = JSON.parse(localStorage.getItem("loginUser")); 
        /*this.loginEmail = {
                email: this.loginuserData['data']['email']
            };*/
    }

    get_users(){
        var headerToken = this._httpService.createAuthorizationHeader();
        return this._http.post(this.baseUrl + "user",{headers:headerToken})
    }

    
    getAllUserData() {
        //var user = JSON.parse(localStorage.getItem('loginUser'));
        //var email = user.data.email;
        //console.log('getUserDetails==>'+email);
        var headerToken = this._httpService.createAuthorizationHeader();

        return <any>new Promise((resolve, reject) => {
                this._http.post(this.baseUrl + "user",{headers:headerToken}).subscribe(
                res => {
                    var resData = res;
                    resolve(resData);
                },
                error => {
                    reject(error);
                }
            )
        });     
    }
    
    saveEmployee(postData: any = []) {
        
        var headerToken = this._httpService.createAuthorizationHeader();
        
        let formdata = new FormData();
        //formdata.append("profile_pic", files[0]);
        
       /* if (postData) {
            for (var key in postData) {
                var value = postData[key];
                formdata.append(key, value);
            }
        }*/
        //console.log(formdata);
        return <any>new Promise((resolve, reject) => {
                this._http.post(this.baseUrl + "updateEmployee", postData, {headers:headerToken}).subscribe(
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

    saveEmployeeDetails(postData: any = []) {
        
        var headerToken = this._httpService.createAuthorizationHeader();
        
        let formdata = new FormData();
        //formdata.append("profile_pic", files[0]);
        
       /* if (postData) {
            for (var key in postData) {
                var value = postData[key];
                formdata.append(key, value);
            }
        }*/
        //console.log(formdata);
        return <any>new Promise((resolve, reject) => {
                this._http.post(this.baseUrl + "addEmployee", postData, {headers:headerToken}).subscribe(
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

    getUserDetails(id:any) {
        //var user = JSON.parse(localStorage.getItem('loginUser'));
        //var email = user.data.email;
        //console.log('getUserDetails==>'+email);
        var headerToken = this._httpService.createAuthorizationHeader();
        return <any>new Promise((resolve, reject) => {
                this._http.post(this.baseUrl + "getUserDetails", {id:id,headers:headerToken}).subscribe(
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
    deleteEmployee(id:any){
         return this._http.post(this.baseUrl + "deleteEmployee",{id:id});  
    }
    
    deleteSelectedEmployee(userIds:any){
        var headerToken = this._httpService.createAuthorizationHeader();
        console.log("UserIds====>"+userIds);
        return this._http.post(this.baseUrl + "deleteSelectedEmployee",{id:userIds,headers:headerToken});  
    }

    unlinkProfile(id:any){
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

    get_products(){
        var headerToken = this._httpService.createAuthorizationHeader();
        return this._http.post(this.baseUrl + "product",{headers:headerToken})
    }
}