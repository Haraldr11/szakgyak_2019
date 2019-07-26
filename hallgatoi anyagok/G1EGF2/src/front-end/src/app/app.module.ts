import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { HttpClientModule } from '@angular/common/http';

import { OdataService } from './services/odata.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule
  ],
  providers: [OdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
