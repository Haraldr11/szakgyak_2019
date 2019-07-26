import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OdataService {
  constructor(private http: HttpClient) { }
  configUrl = "/hana/odata.xsodata/";
  getData(params) {
    return this.http.get(this.configUrl + params);
  }
}
