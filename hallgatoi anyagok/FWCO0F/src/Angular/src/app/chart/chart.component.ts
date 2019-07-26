import { Component, OnInit, OnChanges } from '@angular/core';
import * as CanvasJS from "../../../node_modules/canvasjs/canvasjs.min";
import { OdataService } from '../services/odata.service';
import { ChartDataService } from '../chart-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  data: any = [];
  year = 2017;
  years: any = [];


  constructor(private odata: OdataService, private chartService: ChartDataService) {

  }

  ngOnInit() {
    this.odata
      .getData(["Tarsasag?$top=1000&$format=json&$orderby=TARS_ROV_NEV&$filter=ASZ_EVE eq '2010'"])
      .subscribe((res: any) => {
        this.data = res.d.results;
      });

    this.odata
      .getData(["Years?$top=1000&$format=json"])
      .subscribe((res: any) => {
        this.years = res.d.results;
      });
  }

  onChange(val) {
    this.year = val;

    var tempQuery = "Tarsasag?$top=1000&$format=json&$orderby=TARS_ROV_NEV&$filter=ASZ_EVE eq '" + val + "'";
    console.log(tempQuery);
    this.odata
      .getData([tempQuery])
      .subscribe((res: any) => {
        this.data = res.d.results;
      });

    var db = this.data;

    var newdb = db.filter(function (db) {
      return db.ASZ_EVE == val;
    });

    this.chartService.show_graph(db);

  }



}
