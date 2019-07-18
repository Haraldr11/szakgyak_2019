import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { AppComponent }     from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OdataService }     from './services/odata.service';
import { DiagramComponent } from './diagram/diagram.component';
import { TableComponent }   from './table/table.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
	declarations: [
		AppComponent,
		DiagramComponent,
		TableComponent
    ],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule
	],
	providers: [OdataService],
	bootstrap: [AppComponent]
})
export class AppModule { }
