import { Component, OnInit } from '@angular/core';
import { OdataService } from '../services/odata.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  // TODO
  year = 2011;
  data;

  constructor(private odata: OdataService) {}

  ngOnInit() {
    this.odata.getData(['TARS_ROV_NEV','JEGYZ_TOKE_ERT_HUF']).subscribe((res: any) => {
      this.data = res.d.results;
    });
  }
}
