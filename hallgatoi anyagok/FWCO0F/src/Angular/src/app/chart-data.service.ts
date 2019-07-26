import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { OdataService } from './services/odata.service';
import * as CanvasJS from "../../node_modules/canvasjs/canvasjs.min";


@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  chart;

  constructor() { console.log("ChartData created!"); }

  show_graph(db): void {
    var asd = [];

    for (var i = 0; i < db.length; ++i) {
      asd.push({
        label: db[i].TARS_ROV_NEV,
        y: db[i].JEGYZ_TOKE_ERT_HUF / 1000000
      });
    }

    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      animationDuration: 200,
      title: {
        text: "Cégek vagyona / millió forint"
      },

      data: [
        {
          type: "doughnut",
          indexLabelPlacement: "outside",
          indexLabelOrientation: "horizontal",
          dataPoints: asd
        }
      ]
    });

    this.chart.render();
  }

  fun(msg): void {
    console.log(msg);
  }

}
