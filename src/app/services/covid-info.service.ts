import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidInfoService {
  private codeSource = new BehaviorSubject(0);
  currentCountryCode = this.codeSource.asObservable();

  url = 'https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu';
  constructor(private http: HttpClient) {}

  getData2(): Observable<any> {
    return this.http.get(`${this.url}/latest?onlyCountries=true`);
  }
  getDataByCode(): Observable<any> {
    return this.http.get(`${this.url}/latest?onlyCountries=true&&iso2=VN`);
  }
  getAllCase(): Observable<any> {
    return this.http.get(`${this.url}/brief`);
  }
  getDataForCharts(): Observable<any> {
    return this.http.get(`${this.url}/timeseries?onlyCountries=true`);
  }
  changeCountryCode(code) {
    this.codeSource.next(code);
  }
}
