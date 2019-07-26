import { Component, OnInit } from '@angular/core';
import { TarsasagserviceService } from '../tarsasagservice.service';
import { Observable } from 'rxjs';
import { OdataService } from '../services/odata.service';
import { ChartComponent } from '../chart/chart.component';
import { ChartDataService } from '../chart-data.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  tarsasagok: Observable<any[]>;

  regionColumns: string[];
  regionData: any = [];

  countyColumns: string[];
  countyData: any = [];

  settlementColumns: string[];
  settlementData: any = [];

  constructor(private atService: TarsasagserviceService, private odata: OdataService) { }

  ngOnInit() {

    this.regionColumns = this.atService.getRegionColumns();

    //  1st query, for the regions

    this.odata
      .getData(["Regions?$format=json"])
      .subscribe((res: any) => {
        this.regionData = res.d.results;
      });

  }

  //  Selecting a region will result in listing the counties within
  selectRegion(cnt): void {

    this.countyColumns = this.atService.getCountyColumns();

    this.odata
      .getData(["proba?$select=MEGYE,JEGYZ_TOKE_ERT_HUF&$filter=REGIO eq '" + cnt + "'"])
      .subscribe((res: any) => {
        this.countyData = res.d.results;
      });

    this.settlementColumns = [];
    this.settlementData = [];
  }


  //  Selecting a county will result in listing the settlements within
  selectCounty(stt): void {

    this.settlementColumns = this.atService.getSettlementColumns();

    this.odata
      .getData(["proba?$select=TELEPULES,JEGYZ_TOKE_ERT_HUF&$filter=MEGYE eq '" + stt + "'"])
      .subscribe((res: any) => {
        this.settlementData = res.d.results;
      });
  }
}
