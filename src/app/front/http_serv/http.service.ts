import {Injectable,Input, Output, EventEmitter} from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

import { from } from 'rxjs';
import { of } from 'rxjs';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap, delay } from 'rxjs/operators';


@Injectable()

export class HttpService {
    baseUrl: string;
    
    constructor(private _http: HttpClient) {
        this.baseUrl  = 'http://localhost:3000/';
        console.log(this.baseUrl);
    }
    /*For Set header token in every request*/
    createAuthorizationHeader() {
        var headers = new HttpHeaders();
        var authToken = JSON.parse(localStorage.getItem('loginUser'));
        //console.log(authToken);
        if(authToken.data.token != '') {
            return headers = headers.append('Authorization', 'Bearer ' + authToken.data.token);
        } else {
            return headers.append('Authorization', 'Bearer ' + '');
        }
    }

    
}