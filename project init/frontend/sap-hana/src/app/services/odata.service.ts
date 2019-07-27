import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OdataService {
  configUrl: string = '/hana/tarsasag.xsodata/';
  defaultUrl: string = "tarsasag?$filter=ASZ_EVE eq " +
                       2010 + 
                       " and regio eq 'Dél-Alföld régió'";
  
  areaUrl: string = "";
  areaSubject: BehaviorSubject<string> = 
    new BehaviorSubject<string>(this.areaUrl);

  regionName: string = "Dél-Alföld régió";
  countyName: string = "";
  cityName: string = "";

  regionSubject: BehaviorSubject<string> = 
    new BehaviorSubject<string>("Dél-Alföld régió");
  countySubject: BehaviorSubject<string> = 
    new BehaviorSubject<string>("Bács-Kiskun");

  yr: number = 2010;
  yrSubject: BehaviorSubject<number> = new BehaviorSubject<number>(2010);

  mapRegions: Record<string, string[]> = {
    "Dél-Alföld régió"         : ["Bács-Kiskun", 
                                  "Békés", 
                                  "Csongrád"],
    "Dél-Dunántúl régió"       : ["Baranya",
                                  "Somogy",
                                  "Tolna"],
    "Közép-Dunántúl régió"     : ["Fejér",
                                  "Komárom-Esztergom",
                                  "Veszprém"],
    "Közép-Magyarország régió" : ["Budapest", 
                                  "Pest"],
    "Nyugat-Dunántúl régió"    : ["Győr-Moson-Sopron",
                                  "Vas",
                                  "Zala"],
    "Észak-Alföld régió"       : ["Hajdú-Bihar",
                                  "Jász-Nagykun-Szolnok",
                                  "Szabolcs-Szatmár-Bereg"],
    "Észak-Magyarország régió" : ["Borsod-Abaúj-Zemplén",
                                  "Heves",
                                  "Nógrád"],
  };

  mapCounties: Record<string, string> = {
    "Bács-Kiskun"            : "path10",
    "Csongrád"               : "path12",
    "Győr-Moson-Sopron"      : "polygon16",
    "Heves"                  : "polygon18",
    "Komárom-Esztergom"      : "polygon20",
    "Hajdú-Bihar"            : "polygon22",
    "Jász-Nagykun-Szolnok"   : "polygon24",
    "Veszprém"               : "polygon26",
    "Vas"                    : "polygon28",
    "Budapest"               : "polygon30",
    "Fejér"                  : "polygon32",
    "Békés"                  : "polygon34",
    "Somogy"                 : "polygon36",
    "Zala"                   : "polygon38",
    "Tolna"                  : "polygon40",
    "Baranya"                : "polygon42",
    "Nógrád"                 : "polygon44",
    "Pest"                   : "path46",
    "Borsod-Abaúj-Zemplén"   : "polygon48",
    "Szabolcs-Szatmár-Bereg" : "polygon50"
  };
   
  constructor(private http: HttpClient) { }

  getYr(): Observable<number> {
    return this.yrSubject.asObservable();
  }

  setYr(n): void {
    this.yr = n;
    this.yrSubject.next(n);
  }

  getRegionSubject(): Observable<string> {
    return this.regionSubject.asObservable();
  }

  setRegionName(name: string): void {
    this.regionName = name;
    this.regionSubject.next(this.regionName);
    this.countyName = "";
    this.cityName = "";
    this.calculateAreaUrl();
    this.areaSubject.next(this.areaUrl);
  }

  getCountySubject(): Observable<string> {
    return this.countySubject.asObservable();
  }

  setCountyName(name: string): void {
    this.countyName = name;
    this.countySubject.next(this.countyName);
    this.calculateAreaUrl();
    this.areaSubject.next(this.areaUrl);
  }

  setCityName(name: string): void {
    this.cityName = name;
    this.calculateAreaUrl();
    this.areaSubject.next(this.areaUrl);
  }

  calculateAreaUrl(): void {
    if (this.countyName === "") {
      this.areaUrl = `tarsasag?$filter=ASZ_EVE eq ${this.yr}` + 
                     ` and regio eq '${this.regionName}'`;
    } else if (this.cityName === "") {
      this.areaUrl = `tarsasag?$filter=ASZ_EVE eq ${this.yr}` + 
                     ` and megye eq '${this.countyName}'`;
    } else {
      this.areaUrl = `tarsasag?$filter=ASZ_EVE eq ${this.yr}` + 
                     ` and telepules eq '${this.cityName}'`;
    }
  }

  getAreaUrl(): Observable<string> {
    return this.areaSubject.asObservable();
  }

  getData(params) {
    console.log(this.configUrl + params);
    return this.http.get(this.configUrl + params);
  }

  getRegionData() {
    return this.getData(
      `REGIONS?$filter=EV eq ${this.yr}&$format=json`);
  }

  getCountyData(name: string) {
    return this.getData(
      `COUNTIES?$filter=EV eq ${this.yr} and REGIO eq '${name}'`);
    this.countyName = name;
  }

  getCityData(name: string) {
    return this.getData(
      `CITIES?$filter=EV eq ${this.yr} and MEGYE eq '${name}'`);
    this.cityName = name;
  }
}
