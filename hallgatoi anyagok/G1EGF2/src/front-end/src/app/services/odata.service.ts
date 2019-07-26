import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OdataService {
  constructor(private http: HttpClient) {   }
  
// configUrl = '/hana/company.xsodata/CalcView?$top=1000&$format=json&$orderby=jegyz_toke_ert_huf+desc';

getData(params) {
	return this.http.get('/hana/company.xsodata/' + params);
  //return this.http.get(this.configUrl + `&$select=${temp}`);
}
}