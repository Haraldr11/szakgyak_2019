import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OdataService {
  constructor(private http: HttpClient) {   }
  
	configUrl = '/hana/odata.xsodata/Tarsasagok?$select=TARS_ROV_NEV,CIM_EGYBEN,ASZ_EVE&$top=100&$format=json';


	getData() {
		return this.http.get(this.configUrl);
	}
}