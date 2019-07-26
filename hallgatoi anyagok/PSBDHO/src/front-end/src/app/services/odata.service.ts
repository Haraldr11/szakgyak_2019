import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OdataService {
	constructor(private http: HttpClient) { }

	configUrl = '/hana/company.xsodata/COMPANY?';

	getData(params) {
		console.log(this.configUrl + params);
		return this.http.get(this.configUrl + params);
	}
}