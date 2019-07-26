import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GeocoderService {
  constructor(private http: HttpClient) {   }
  
	BingMapsAPIKey = 'AnR0we4gb-wOGkIzhtplEOeIlZtLbuIsq1bhVz-REPiUYuwcON6uix84duNBwWLT';
	coordinateURL1 = 'http://dev.virtualearth.net/REST/v1/Locations/"';
	coordinateURL2 = '"?&key='+this.BingMapsAPIKey;
	mapURL = 'https://dev.virtualearth.net/REST/V1/Imagery/Map/Road/';


	async getCoordinates(query) {
		let response: any;
		response = await this.http.get(this.coordinateURL1 + query + this.coordinateURL2).toPromise();
		return response.resourceSets[0].estimatedTotal == 0 ? null : response;
	}
	
	getMapURL(coords){
		return (this.mapURL+coords+'/10?&pp='+coords+'&key='+this.BingMapsAPIKey);
	}
}