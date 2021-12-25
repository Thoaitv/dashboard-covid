import { Component, OnInit, VERSION } from '@angular/core';
import { CovidInfoService } from 'src/app/services/covid-info.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint!: number;
  coronaData: any;
  fatalityRate: any;
  countryList: any;
  option: any;
  allCase: any;
  allCaseRate: any;
  constructor(private myService: CovidInfoService) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 900) ? 1 : 4;
    this.getVietNamCase();

    this.getCurrentData();

    this.getAllCase();
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 900) ? 1 : 4;
  }
  // states: string[] = [
  //   'Alabama',
  //   'Alaska',
  //   'Arizona',
  //   'Arkansas',
  //   'California',
  //   'Colorado',
  //   'Connecticut',
  //   'Delaware',
  //   'Florida',
  //   'Georgia',
  //   'Hawaii',
  //   'Idaho',
  //   'Illinois',
  //   'Indiana',
  //   'Iowa',
  //   'Kansas',
  //   'Kentucky',
  //   'Louisiana',
  //   'Maine',
  //   'Maryland',
  //   'Massachusetts',
  //   'Michigan',
  //   'Minnesota',
  //   'Mississippi',
  //   'Missouri',
  //   'Montana',
  //   'Nebraska',
  //   'Nevada',
  //   'New Hampshire',
  //   'New Jersey',
  //   'New Mexico',
  //   'New York',
  //   'North Carolina',
  //   'North Dakota',
  //   'Ohio',
  //   'Oklahoma',
  //   'Oregon',
  //   'Pennsylvania',
  //   'Rhode Island',
  //   'South Carolina',
  //   'South Dakota',
  //   'Tennessee',
  //   'Texas',
  //   'Utah',
  //   'Vermont',
  //   'Virginia',
  //   'Washington',
  //   'West Virginia',
  //   'Wisconsin',
  //   'Wyoming',
  // ];
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
  getVietNamCase() {
    this.myService
      .getData2()
      .toPromise()
      .then(
        (data) =>
        (this.option = data.findIndex(
          (item: any) => item.countryregion == 'Vietnam'
        ))
      );
    this.myService.changeCountryCode(this.option);
  }
}
