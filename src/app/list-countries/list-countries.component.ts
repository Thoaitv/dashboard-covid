import { Component, OnInit } from '@angular/core';
import { CovidInfoService } from '../services/covid-info.service';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.css']
})
export class ListCountriesComponent implements OnInit {
  coronaData;
  fatalityRate;
  countryList: any;
  option;
  allCase: any;
  allCaseRate: any;
  p = 1;
  constructor(private myService: CovidInfoService) { }

  ngOnInit(): void {

    this.getCurrentData();

  }
  async getCurrentData() {
    await this.myService
      .getData2()
      .toPromise()
      .then((data) => {
        this.countryList = data;
        this.coronaData = data[this.option];
        this.fatalityRate = (
          (this.coronaData.deaths / this.coronaData.confirmed) *
          100
        ).toFixed(2);
      });
  }

  showData() {
    this.myService.changeCountryCode(this.option);
    this.coronaData = this.countryList[this.option];

    this.fatalityRate = (
      (this.coronaData.deaths / this.coronaData.confirmed) *
      100
    ).toFixed(2);
  }

}
