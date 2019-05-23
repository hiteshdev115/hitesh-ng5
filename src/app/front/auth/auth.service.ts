import {Injectable,Input, Output, EventEmitter} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { from } from 'rxjs';
import { of } from 'rxjs';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap, delay } from 'rxjs/operators';


import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()

export class AuthService {
    isLoggedIn: boolean = false;
    
    baseUrl: string;
    @Input() public isUserLoggedIn: boolean;
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

    constructor(private _http: HttpClient) {
        this.baseUrl  = 'http://localhost:3000/api/';
    }

    /*checkExistsUser() {
        if(this.getLoginUserInfo()) {
            return Observable.of().delay(1000).do(val => this.isUserLoggedIn = true);
        }
    }*/

    getUserData() {
        let header = new HttpHeaders();
        header.append('token',localStorage.getItem('token'));
        console.log('get user data');

        return <any>new Promise((resolve, reject) => {
                this._http.get(this.baseUrl + "home",{headers: header}).subscribe(
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

    registerUser(registrerFormData) {
        let header = new HttpHeaders();
        header.append('token',localStorage.getItem('token'));
        console.log(registrerFormData);
        return <any>new Promise((resolve, reject) => {
                this._http.post(this.baseUrl + "saveUser", registrerFormData, {headers: header}).subscribe(
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
   
    login(loginFormData) {
        //console.log(loginFormData);
        return <any>new Promise((resolve, reject) => {
                this._http.post(this.baseUrl + "login", loginFormData).subscribe(
                res => {
                    if (res) {
                        var resData = res;
                        this.getLoggedInName.emit('hitesh');
                        localStorage.setItem('loginUser', JSON.stringify(res));
                        resolve(resData);
                    }
                    return res;
                },
                error => {
                    reject(error);
                }
            )
        })    
    }    

    getLoginUserInfo() {
        let local_user_info = "";
        try {
            if (typeof (Storage) !== undefined && localStorage.getItem("loginUser") != null && localStorage.getItem("loginUser") != undefined) {
                local_user_info = localStorage.getItem("loginUser");
                if (local_user_info !== "undefined" && local_user_info !== undefined) {
                    local_user_info = JSON.parse(local_user_info);
                } else {
                    this.logout();
                }
            } else {
                this.logout();
            }
        } catch (err) {
            this.logout();
        }
        console.log(local_user_info);
        return local_user_info;
    }


    logout() {
        // remove user from local storage to log user out
        this.isLoggedIn = false;
        localStorage.removeItem('loginUser');
    }

    
}