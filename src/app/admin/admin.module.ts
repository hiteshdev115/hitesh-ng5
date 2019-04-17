import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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

import { ConfirmationDialogComponent } from './component/confirmation-dialog.component';
import { ConfirmationDialogService } from './auth/confirmation-dialog.service';

import { AdminRoute } from './admin.route';

@NgModule({
  imports: [
    CommonModule,
    AdminRoute,
    FormsModule
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
    ConfirmationDialogComponent
  ],
  providers: [AuthGuard,AuthService,DataService,HttpService,ConfirmationDialogService],
  entryComponents: [ ConfirmationDialogComponent ],
  exports:[],
  bootstrap: [],
  
})
export class AdminModule {
  constructor(){
    console.log('admin module');
  }
}