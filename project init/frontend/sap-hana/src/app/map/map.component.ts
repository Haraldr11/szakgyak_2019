import { Component, OnInit } from '@angular/core';
import { OdataService } from '../services/odata.service';

@Component({
  selector: 'app-map',
  templateUrl: './Hungary_location_map.svg',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  regionName: string;
  countyName: string;


  constructor(private odata: OdataService) { }

  ngOnInit() { 
    this.odata
      .getRegionSubject()
      .subscribe(name => {
        if (this.regionName != null) {
          let arr = this.odata.mapRegions[this.regionName];
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] != null) {
              let e = this.odata.mapCounties[arr[i]];
              document
                .getElementById(e)
                .classList.remove("active");
            }
          }
        }
        this.regionName = name;
        this.refreshActiveArea(this.odata.mapRegions[name]);
      });
    this.odata
      .getCountySubject()
      .subscribe(name => {
        if (this.countyName != null) {
          document
            .getElementById(this.odata.mapCounties[this.countyName])
            .classList.remove("active");
          let arr = this.odata.mapRegions[this.regionName];
          for (let i = 0; i < arr.length; i++) {
            let e = this.odata.mapCounties[arr[i]];
            document
              .getElementById(e)
              .classList.remove("active");
          }
        }
        this.countyName = name;
        if (name != undefined) {
          this.refreshActiveArea([name]);
        }
      });
  } 
  
  refreshActiveArea(arr: string[]): void {
    for (let i = 0; i < arr.length; i++) {
      let e = this.odata.mapCounties[arr[i]];
      document
        .getElementById(e)
        .classList.add("active");
    }
  }
}
