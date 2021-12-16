import { Component, OnInit } from '@angular/core';
import { CovidInfoService } from '../services/covid-info.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  title = 'FA-Corona';
  coronaData;
  fatalityRate;
  countryList: any;
  option;
  allCase: any;
  allCaseRate: any;

  isListCountries: boolean = false;
  isConntry: boolean = true;

  constructor(private myService: CovidInfoService) { }

  ngOnInit(): void {
    this.getVietNamCase();

    this.getCurrentData();

    this.getAllCase();
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
  getAllCase() {
    this.myService
      .getAllCase()
      .subscribe(
        (data) => (
          (this.allCase = data),
          (this.allCaseRate = ((data.deaths / data.confirmed) * 100).toFixed(2))
        )
      );
  }
  async getVietNamCase() {
    await this.myService
      .getData2()
      .toPromise()
      .then(
        (data) =>
        (this.option = data.findIndex(
          (item) => item.countryregion == 'Vietnam'
        ))
      );
    this.myService.changeCountryCode(this.option);
  }


  showListCountries() {
    this.isListCountries = true;
    this.isConntry = false;
  }
  showCountry() {
    this.isListCountries = false;
    this.isConntry = true;
  }

}
