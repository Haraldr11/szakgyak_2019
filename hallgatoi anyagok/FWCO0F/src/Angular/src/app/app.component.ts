import { Component, OnInit } from "@angular/core";
import * as CanvasJS from "../../node_modules/canvasjs/canvasjs.min";

import { ChartDataService } from './chart-data.service';
import { TarsasagserviceService } from './tarsasagservice.service';
import { OdataService } from './services/odata.service';
import { ChartComponent } from './chart/chart.component';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }


}
