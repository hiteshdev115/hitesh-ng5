import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MatDialogModule } from '@angular/material'; //for open dialog


import { LoginComponent }     from './component/login.component';
import { HeaderComponent }     from './component/header.component';
import { FooterComponent }     from './component/footer.component';
import { DashboardComponent }     from './component/dashboard.component';
import { AdminhomeComponent }     from './component/adminhome.component';
import {UserComponent} from './component/user.component';
import {ProductComponent} from './component/product.component';
import {EdituserComponent} from './component/edituser.component';
import {AdduserComponent} from './component/adduser.component';

import { AuthService } from './auth/auth.service';
import { DataService } from './auth/data.service';
import { HttpService } from './http_serv/http.service';
import { AuthGuard } from './_guards/auth.guard';

import { EventEmitterService } from './event-emitter.service';

import { AdminRoute } from './admin.route';
import { DialogBodyComponent } from './component/dialog-body/dialog-body.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoute,
    FormsModule,
    MatDialogModule
    
  ],
  declarations: [
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AdminhomeComponent,
    DashboardComponent,
    UserComponent,
    ProductComponent,
    EdituserComponent,
    AdduserComponent,
    DialogBodyComponent
  ],
  providers: [AuthGuard,AuthService,DataService,HttpService,EventEmitterService],
  exports:[],
  bootstrap: [],
  entryComponents: [DialogBodyComponent]  
})
export class AdminModule {
  constructor(){
    console.log('admin module');
  }
}