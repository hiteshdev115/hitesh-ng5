import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import {LoginComponent} from './component/login.component';
import {DashboardComponent} from './component/dashboard.component';
import {AdminhomeComponent} from './component/adminhome.component';
import {UserComponent} from './component/user.component';
import {ProductComponent} from './component/product.component';
import {EdituserComponent} from './component/edituser.component';
import {AdduserComponent} from './component/adduser.component';
import { AuthGuard } from './_guards/auth.guard';

export const BackRoute: Routes = [
  {
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'login'
  },  
  {
    path: 'login',
    component: LoginComponent
    // canActivate: [AuthGuard],
  },
  {
    path: '',
    component: AdminhomeComponent,
    children: [
      {
         path: 'user',
         component: UserComponent,
         canActivate: [AuthGuard]
      },
      {
         path: 'dashboard',
    	   component: DashboardComponent,
         canActivate: [AuthGuard]
      },
      {
         path: 'product',
         component: ProductComponent,
         canActivate: [AuthGuard]
      },
      {
        path: 'user/add',
        component: AdduserComponent,
        canActivate: [AuthGuard]
      }, 
      {
        path: 'edit/:id',
        component: EdituserComponent,
        canActivate: [AuthGuard]
      },  
      {
        path: 'deleteEmployee',
        component: UserComponent,
        canActivate: [AuthGuard]
      },
          
    ]
  }
];

export const AdminRoute: ModuleWithProviders = RouterModule.forChild(BackRoute);