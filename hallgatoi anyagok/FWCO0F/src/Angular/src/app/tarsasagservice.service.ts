import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { OdataService } from './services/odata.service';


@Injectable({
  providedIn: 'root'
})
export class TarsasagserviceService {

  regionData: any = [];
  countyData: any = [];
  settlementData: any = [];

  constructor(private odata: OdataService) {

  }


  getRegionColumns(): string[] {
    return ["Régió", "Mennyiség", "Érték"]
  }

  getRegionData(): Observable<any[]> {
    return Observable.of(this.regionData).delay(100);
  }

  getCountyColumns(): string[] {
    return ["Megye", "Érték"]
  }

  getCountyData(): Observable<any[]> {
    return Observable.of(this.countyData).delay(100);
  }

  getSettlementColumns(): string[] {
    return ["Település", "Érték"]
  }

  getSettlementData(): Observable<any[]> {
    return Observable.of(this.settlementData).delay(100);
  }



}
