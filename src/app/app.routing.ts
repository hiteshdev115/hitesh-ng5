// routerConfig.ts
import { ModuleWithProviders }  from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

export const appRoutes: Routes = [
    
	{ 
    	path: 'admin', 
    	loadChildren: '../app/admin/admin.module#AdminModule' 
    },

    { 
    	path: '', 
    	loadChildren: '../app/front/layout.module#LayoutModule' 
    }
   
];

export const rootRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ enableTracing: false });