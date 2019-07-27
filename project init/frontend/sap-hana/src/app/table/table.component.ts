import { Component, OnInit } from '@angular/core';
import { OdataService } from '../services/odata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  regionColumns : string[] = ["Régió","Mennyiség[Millió HUF]","Érték[db]"];
  countyColumns : string[] = ["Megye","Mennyiség[Millió HUF]","Érték[db]"];
  cityColumns   : string[] = ["Település","Mennyiség[Millió HUF]","Érték[db]"];
  regionData    : any      = [];
  countyData    : any      = [];
  cityData      : any      = [];
  selectedYear  : number   = 2010;
  selectedRegionIndex : number = 0;
  selectedCountyIndex : number = 0;
  selectedCityIndex   : number = 0;

  constructor(private odata: OdataService) {}

  ngOnInit(): void {
    this.odata
      .getYr()
      .subscribe(n => {
        this.selectedYear = n;
        this.listRegions();   
      });
      document
        .getElementById(this.selectedYear.toString())
        .classList
        .add("active");
  }

  // list every region within Hungary
  listRegions(): void {
    this.odata
      .getRegionData()
      .subscribe((res: any) => {
        this.regionData = res.d.results;
      });
    this.countyData = [];
    this.cityData = [];
  }

  // list every county within the region
  selectRegion(name: string): void {
    this.odata
      .getCountyData(name)
      .subscribe((res: any) => {
        this.countyData = res.d.results;
      });
    this.cityData = [];
  }

  // list every city within the county 
  selectCounty(name: string): void {
    this.odata
      .getCityData(name)
      .subscribe((res: any) => {
        this.cityData = res.d.results;
      });
  }

  yearClicked(n: number) { 
    document
      .getElementById(this.selectedYear.toString())
      .classList
      .remove("active")
    this.odata.setYr(n);
    document
      .getElementById(n.toString())
      .classList
      .add("active");
  }

  // to highlight the clicked row
  regionClicked(n: number): void {
    this.selectedRegionIndex = n;
    this.odata.setRegionName(this.regionData[n].REGIO);
  }

  // to highlight the clicked row
  countyClicked(n: number): void {
    this.selectedCountyIndex = n;
    this.odata.setCountyName(this.countyData[n].MEGYE);
  }

  // to highlight the clicked row
  cityClicked(n: number): void {
    this.selectedCityIndex = n;
    this.odata.setCityName(this.cityData[n].TELEPULES);
  }
}
