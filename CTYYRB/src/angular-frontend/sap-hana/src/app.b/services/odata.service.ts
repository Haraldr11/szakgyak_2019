import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OdataService {
	constructor(private http: HttpClient) {   }

	configUrl = '/hana/tarsasag.xsodata/tarsasag?$top=1000&$format=json&$orderby=JEGYZ_TOKE_ERT_HUF+desc';
	getData(params) {
		console.log(params);
		let rval = this.http.get(this.configUrl);
		console.log('TYPE OF RVAL: ' + rval.constructor.name);
		return rval;
	}
}
