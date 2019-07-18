import { Component, OnInit, OnChanges } from '@angular/core';
import * as CanvasJS from '../../../lib/canvasjs.min';
import { OdataService } from '../services/odata.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {
  // TODO
  year = 2011;
  data;

  constructor(private odata: OdataService) { }

  ngOnInit() {
    this.odata.getData(["tarsasag?$top=1000&$format=json&$orderby=TARS_ROV_NEV&$filter=ASZ_EVE eq '2010'"]).subscribe((res: any) => {
      this.data = res.d.results;
      show_graph(this.data);
    });
    function show_graph(db) {
      let newdb = db.filter(function (db) {
        return db.ASZ_EVE == 2011;
      });
      // console.log("DB.LENGTH: " + db.length)
      // console.log("NEWDB.LENGTH: " + newdb.length)
      let arr = [];
      for (let i = 0; i < newdb.length; ++i) {
        arr.push({ label: newdb[i].TARS_ROV_NEV, 
                   y:     newdb[i].JEGYZ_TOKE_ERT_HUF / 1000000 });
      }
      var chart = new CanvasJS.Chart("chartContainer",
      {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Jegyzett tőke / millió HUF",
          fontSize: 20
        },
        data: [ 
          {
            type: "column",
            indexLabelPlacement: "outside",
            indexLabelOrientation: "horizontal",
            dataPoints: arr
          } 
        ],
        backgroundColor: "#F1F1F1"
      });
      chart.render();
    }
  }
  onChange(val) {
    this.year = val;
    console.log(val);

    let db = this.data;
    let newdb = db.filter(function (db) {
      return db.ASZ_EVE == val;
    });
    console.log("NEWDB.LENGTH: " + newdb.length)

    let arr = [];
    for (let i = 0; i < newdb.length; ++i) {
      arr.push({ label: newdb[i].TARS_ROV_NEV, 
                 y:     newdb[i].JEGYZ_TOKE_ERT_HUF / 1000000 });
    }
    let chart = new CanvasJS.Chart("chartContainer",
    {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Jegyzett tőke / millió HUF",
        fontSize: 20
      },
      data: [
        {
          type: "column",
          indexLabelPlacement: "outside",
          indexLabelOrientation: "horizontal",
          dataPoints:  arr
        }
      ],
      backgroundColor: "#F1F1F1"
    });
    chart.render();
  }
}
