import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../node_modules/canvasjs/canvasjs.min';
import { OdataService } from './services/odata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'sap-hana';
  year = 2017;
  data: any = [];
  years: any = [];

  diag_x = 'rov_nev';
  diag_y = 'jegyz_toke_ert_huf';
  diag_title = 'Cégek vagyona (milliók)';

  constructor(private odata: OdataService) { }



  ngOnInit() {
    this.odata.getData('$top=1000').subscribe((res: any) => {
      this.data = res.d.results;
      this.show_graph(this.data);
    });

    this.odata.getData('$select=asz_eve&$top=100&$orderby=asz_eve').subscribe((res: any) => {
      this.years = res.d.results;
      console.log(this.years);

    });

  }

  show_graph(db) {
    var diagramElements = [];

    for (var i = 0; i < db.length; ++i) {
      diagramElements.push({ label: db[i][this.diag_x], y: db[i][this.diag_y] / 1000000 })

    }

    var chart = new CanvasJS.Chart("chartContainer",
      {
        animationEnabled: true,
        exportEnabled: true,
        backgroundColor: "transparent",
        title: {
          text: this.diag_title,

          fontSize: 20
        },

        data: [
          {
            type: "doughnut",

            indexLabelPlacement: "outside",
            indexLabelOrientation: "horizontal",
            dataPoints: diagramElements
          }
        ]
      });

    chart.render();
  }

  onChange(val) {
    this.year = val;

    var newdb = this.data.filter(function (db) {
      return db.asz_eve == val;
    });

    this.show_graph(newdb);
  }
}