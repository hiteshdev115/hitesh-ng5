import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import {LoginComponent} from './component/login.component';
import {DashboardComponent} from './component/dashboard.component';
import {AdminhomeComponent} from './component/adminhome.component';
import {UserComponent} from './component/user.component';
import {EdituserComponent} from './component/edituser.component';
import {AdduserComponent} from './component/adduser.component';

import {ProductComponent} from './component/product.component';
import {AddproductComponent} from './component/addproduct.component';
import {EditProductComponent} from './component/editproduct.component';


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
      {
        path: 'deleteSelectedEmployee',
        component: UserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'product',
        component: ProductComponent,
        canActivate: [AuthGuard]
     },
     {
      path: 'product/add',
      component: AddproductComponent,
      canActivate: [AuthGuard]
    }, 
    {
      path: 'product/edit/:id',
      component: EditProductComponent,
      canActivate: [AuthGuard]
    },  
    {
      path: 'deleteProduct',
      component: ProductComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'deleteSelectedProduct',
      component: ProductComponent,
      canActivate: [AuthGuard]
    },
       
    ]
  }
];

export const AdminRoute: ModuleWithProviders = RouterModule.forChild(BackRoute);