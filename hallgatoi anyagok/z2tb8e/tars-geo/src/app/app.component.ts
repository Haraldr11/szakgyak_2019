import { Component, OnInit, ViewChild } from '@angular/core';
import { OdataService } from './services/odata.service';
import { GeocoderService } from './services/geocoder.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	title = 'tars-geo';
	@ViewChild('coordSpan') coordSpan;
	@ViewChild('mapImg') mapImg;
	tarsasagok;
  
	constructor(private odata: OdataService, private geocoder: GeocoderService) {}
	
	ngOnInit() {
		this.odata.getData().subscribe((res : any) => 
			{this.tarsasagok = (res.d.results);});
	}
	
	async Geocode(cim){
		let json: any;
		json = await this.geocoder.getCoordinates(cim);
		if(json == null){
			this.coordSpan.nativeElement.innerHTML = 'Ismeretlen cím';
			this.mapImg.nativeElement.src = 'https://www.realsimple.com/img/icons/missing-image-4x3.png';
			return;
		}
		let coords = (json.resourceSets[0].resources[0].geocodePoints[0].coordinates).toString();
		this.coordSpan.nativeElement.innerHTML = coords;
		this.mapImg.nativeElement.src = this.geocoder.getMapURL(coords);
	}
	
}