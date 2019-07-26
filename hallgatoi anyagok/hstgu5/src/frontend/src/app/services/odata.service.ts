import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OdataService {
  constructor(private http: HttpClient) {   }
  
configUrl = '/hana/od.xsodata/DATA?$top=1000&$format=json&$orderby=jegyz_toke_ert_huf+desc';

getData(params) {
	console.log(params);
	const temp = params.join(',');
	return this.http.get(this.configUrl);
  //return this.http.get(this.configUrl + `&$select=${temp}`);
}
}