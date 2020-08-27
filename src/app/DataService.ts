import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Party } from "./party-results/party-results.component";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private apiBaseUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) {}

  private _getUrl(endpointUrl: string): string {
    return this.apiBaseUrl + endpointUrl;
  }

  public getParties(): Promise<Party[]> {
    const url = this._getUrl("/parties");
    return this.http
      .get<Party[]>(url)
      .toPromise()
      .then((response) => {
        console.log({ response });
        return response as Party[];
      });
  }
}
