import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule }    from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { rootRouting } from './app.routing';



@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    rootRouting,
    HttpClientModule
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
