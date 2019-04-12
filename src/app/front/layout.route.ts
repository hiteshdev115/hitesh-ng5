import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import {FronthomeComponent} from './component/common/fronthome.component';

import {HomepageComponent} from './component/homepage.component';
import {AboutusComponent} from './component/aboutus.component';
import {GalleryComponent} from './component/gallery.component';
import {ContactusComponent} from './component/contactus.component';
import {LoginComponent} from './component/login.component';
import {ProfileComponent} from './component/profile.component';

import { AuthGuard } from './_guards/auth.guard';

export const LayoutRoute: Routes = [
  
  {
    path: '',
    component: FronthomeComponent,
    children: [
      {
         path: '',
    	   component: HomepageComponent
      },
      {
         path: 'aboutus',
         component: AboutusComponent
      },
      {
         path: 'gallery',
         component: GalleryComponent
      },
      {
         path: 'contactus',
         component: ContactusComponent
      },
      {
         path: 'login',
         component: LoginComponent
      },
      {
         path: 'profile',
         component: ProfileComponent,
         canActivate:[AuthGuard]
      }
    ]
  }
];

export const FrontRoute: ModuleWithProviders = RouterModule.forChild(LayoutRoute);