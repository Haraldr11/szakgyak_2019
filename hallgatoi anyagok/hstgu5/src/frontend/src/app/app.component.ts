import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../canvasjs.min';
import { OdataService } from './services/odata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'Cégek';
  year = 2017;
  
  years:any=[2011,2012,2013,2014,2015,2016,2017];
  data;
  origindata;

  constructor(private odata: OdataService) { }



  ngOnInit() {

    this.odata.getData(['tars_rov_nev']).subscribe((res:any) => {
      this.origindata = res.d.results;
	  this.data= this.origindata;
	  var db = this.origindata;
		var val = 2011;
		
		
         var newdb = db.filter(function (db) {
           return  db.asz_eve == val ;
       });
	   this.data=newdb;
      show_graph(newdb);
    });


    function show_graph(db) {
		

      //   var newdb = db.filter(function (db) {
      //     return  db.asz_eve == this.year ;
      // });


      var asd = [];

      for (var i = 0; i < db.length; ++i) {
        asd.push({ label: db[i].tars_rov_nev, y: db[i].jegyz_toke_ert_huf / 1000000 })
        //  asd[i].label = db[i].tars_rov_nev;
        //  asd[i].y = db[i].jegyz_toke_ert_huf / 1000000;
      }
      console.log(db[0].tars_rov_nev);

      var chart = new CanvasJS.Chart("chartContainer",
        {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Cégek vagyona /millió forint",
			
            fontSize: 20
          },

          data: [
            {
              type: "pie",

              //indexLabel: "{label}, {y}",
              indexLabelPlacement: "outside",
              indexLabelOrientation: "horizontal",
              dataPoints: asd
            }
          ]
        });

      chart.render();
    }
  }
  onChange(val) {
    this.year = val;
    console.log(val);
    
    var db = this.origindata;

         var newdb = db.filter(function (db) {
           return  db.asz_eve == val ;
       });


	this.data = newdb;
      var asd = [];

      for (var i = 0; i < newdb.length; ++i) {
        asd.push({ label: newdb[i].tars_rov_nev, y: newdb[i].jegyz_toke_ert_huf / 1000000 })
        //  asd[i].label = db[i].tars_rov_nev;
        //  asd[i].y = db[i].jegyz_toke_ert_huf / 1000000;
      }

      var chart = new CanvasJS.Chart("chartContainer",
        {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Cégek vagyona /millió forint",

            fontSize: 20
          },

          data: [
            {
              type: "pie",

              //indexLabel: "{label}, {y}",
              indexLabelPlacement: "outside",
              indexLabelOrientation: "horizontal",
              dataPoints: asd
            }
          ]
        });

      chart.render();
    


  }

}



