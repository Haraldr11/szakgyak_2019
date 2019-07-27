import { Component, OnInit, OnChanges } from '@angular/core';
import * as CanvasJS from '../../../lib/canvasjs.min';
import { OdataService } from '../services/odata.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {
  selectedYear : number = 2010;
  data         : any    = [];

  constructor(private odata: OdataService) { }

  ngOnInit() {
    this.odata
      .getYr()
      .subscribe(n => { 
        this.selectedYear = n;
        this.refreshData(this.selectedYear, this.odata.defaultUrl);
      });
    this.odata
      .getAreaUrl()
      .subscribe(url => {
        if (url != "") {
          this.refreshData(this.selectedYear, url);
        }
      });
  }

  refreshData(n: number, url: string): void {
    if (url === "") {
      url = "tarsasag?$filter=ASZ_EVE eq " + 
            this.selectedYear +
            " and regio eq 'Dél-Alföld régió'";
    }
    this.odata
      .getData(url)
      .subscribe((res: any) => {
        this.data = res.d.results;
        this.showGraph();
      });
  }

  showGraph(): void {
    let arr = [];
    this.data.forEach(function (item) {
      arr.push({label: item.TARS_ROV_NEV,y: item.JEGYZ_TOKE_ERT_HUF/1000000});
    });

    let name = "";
    if (this.odata.countyName === "") {
      name = this.odata.regionName;
    } else if (this.odata.cityName === "") {
      name = this.odata.countyName;
    } else {
      name = this.odata.cityName;
    }

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: name,
        fontSize: 20
      },
      subtitles: [
        {
          text: "Jegyzett tőke / Millió HUF"
        }
      ],
      data: [ 
        {
          type: "doughnut",
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
