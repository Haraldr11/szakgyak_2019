import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../lib/canvasjs.min';
import { OdataService } from './services/odata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'My Testing Chamber';
  data: any; 
  years: any = [];
  regions: any = [];

  constructor(private odata: OdataService) { }

  /**
   * 
   * @param datas  datas should look like : {label: ,y: }
   * draws_the chart for the datas
   */
  draw_chart(datas) {
    var sum = 0
    for (var i = 0; i < datas.length; i++) {
      sum += datas[i].y
    }
    var chart = new CanvasJS.Chart("chartContainer",
      {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Cégek vagyona (Összesen " + sum + " Millió HUF)",

          fontSize: 20
        },

        data: [
          {
            type: "pie",
            indexLabelPlacement: "outside",
            indexLabelOrientation: "vertical",
            dataPoints: datas
          }
        ]
      });

    chart.render();
  }


  /**
   * Gets the existing regions and years, and filsl the selectors with those values, and shows the graph
   * 
   */
  ngOnInit() {
    this.odata.getData('/CalcView?$select=asz_eve').subscribe((res: any) => {

      for (let i = 0; i < res.d.results.length; ++i)
        this.years[i] = res.d.results[i].asz_eve;

      this.years.curr = this.years[0];
    });

    this.odata.getData('/CalcView?$select=megye').subscribe((res: any) => {

      for (let i = 0; i < res.d.results.length; ++i)
        this.regions[i] = res.d.results[i].megye;

      this.regions.curr = this.regions[0];
    });



    this.odata.getData('/CalcView?$top=1000&$format=json&$orderby=jegyz_toke_ert_huf+desc').subscribe((res: any) => {
      this.data = res.d.results;
      this.onChange(this.years.curr);
    });
  }//ngOnInit


  /**
   * 
   * @param val 
   * this handles the changes in the selectors in the html page ( you can filter by year and region)
   */
  onChange(val){
    isNaN(val) ? this.regions.curr = val :this.years.curr = val;
    

    var curryear = this.years.curr;
    var curregion = this.regions.curr;

    var db = this.data;

    var newdb = db.filter(function (db) {
      return db.asz_eve == curryear && db.megye == curregion;
    });

    var asd = [];

    for (var i = 0; i < newdb.length; ++i)
      asd.push({ label: newdb[i].tars_rov_nev, y: newdb[i].jegyz_toke_ert_huf / 1000000 });


    this.draw_chart(asd);
  }

}