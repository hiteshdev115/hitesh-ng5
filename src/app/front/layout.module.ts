import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { FronthomeComponent }     from './component/common/fronthome.component';
import { HeaderComponent }     from './component/common/header.component';
import { FooterComponent }     from './component/common/footer.component';

import { HomepageComponent }     from './component/homepage.component';
import { AboutusComponent }     from './component/aboutus.component';
import {GalleryComponent} from './component/gallery.component';
import {ContactusComponent} from './component/contactus.component';
import {LoginComponent} from './component/login.component';
import {ProfileComponent} from './component/profile.component';

import { AuthService } from './auth/auth.service';
import { DataService } from './auth/data.service';
import { HttpService } from './http_serv/http.service';
import { AuthGuard } from './_guards/auth.guard';

import { FrontRoute } from './layout.route'; //Front Route File


@NgModule({
  imports: [
    CommonModule,
    FrontRoute,
    FormsModule
  ],
  declarations: [
    FronthomeComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    AboutusComponent,
    GalleryComponent,
    ContactusComponent,
    LoginComponent,
    ProfileComponent
  ],
  providers: [AuthGuard,AuthService,DataService,HttpService],
  exports:[],
  bootstrap: []
})
export class LayoutModule {
  constructor(){
    console.log('layout module');
  }
}