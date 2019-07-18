import { Component, OnInit } from '@angular/core';
import { OdataService }      from '../services/odata.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  regionColumns : string[] = ["Régió", "Mennyiség", "Érték"];
  countyColumns : string[] = ["Megye", "Mennyiség", "Érték"];
  cityColumns   : string[] = ["Település", "Mennyiség", "Érték"];
  regionData    : any      = [];
  countyData    : any      = [];
  cityData      : any      = [];
  year          : number   = 2011;

  constructor(private odata: OdataService) {}

  ngOnInit() {
    // list the regions initially
    this.odata
      .getData(["regio?$format=json"])
      .subscribe((res: any) => {
        this.regionData = res.d.results;
      });
  }

  // list every county within the region
  selectRegion(name: string): void {
    this.odata
      .getData(["tarsasag?$select=megye&$filter=regio eq '"
        + name + "' and ASZ_EVE eq " + this.year])
      .subscribe((res: any) => {
        this.countyData = res.d.results;
      });
    this.cityData = [];
  }

  // list every city within the county
  selectCounty(name: string): void {
    this.odata
      .getData(["tarsasag?$select=telepules&$filter=megye eq '"
        + name + "' and ASZ_EVE eq " + this.year])
      .subscribe((res: any) => {
        this.cityData = res.d.results;
      });
  }

  // TODO: frissítsen is adatot
  setYear(n: number) { 
    this.year = n; 
    console.log("DEBUG: year: " + this.year);
  }
}
