import { Component, OnInit } from '@angular/core';
import { CovidInfoService } from 'src/app/services/covid-info.service';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  caseData: any[]=[];
  Code: any = 'VN';
  chartData: any[]=[];

  // view: any[number] = [700, 400];
  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel: any;
  showYAxisLabel = true;
  yAxisLabel = 'Number of cases';
  timeline = true;
  firstCharts:any;
  // colorScheme ={
  //   domain: ['#9e0e95', 'red', '#0b8c21', '#AAAAAA']
  // };

  public colorScheme: string | Color = {
    name: '',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5'],
  };
  // line, area
  autoScale = true;
  constructor(private myService: CovidInfoService) { }

  ngOnInit(): void {
    this.myService.currentCountryCode.subscribe(
      (data:any) => ((this.Code = data), this.getCountryList())
    );
  }
  getTimeLine(timeLine: any, target: number) {
    return Math.floor(Number(timeLine.length - 1) / target);
  }
  buildCharts(data:any): void {
    this.xAxisLabel = `${data.countryregion}`;
    let timeLine = Object.keys(data.timeseries);

    this.chartData = [
      {
        name: 'confirmed',
        series: [
          {
            name: timeLine[0],
            value: data.timeseries.timeLine[0].confirmed
          }, {
            name: timeLine[1],
            value: data.timeseries.timeLine[1].confirmed
          }
        ]
      }
    ]
  }

  onSelect(event:any) {
    console.log(event);
  }

  async getCountryList() {
    await this.myService
      .getDataForCharts()
      .toPromise()
      .then((data:any) => {
        this.buildCharts(data[this.Code]);
      });
  }
}
