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

  view: [number,number] = [700, 400];

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

 colorScheme: string | Color = {
    name: '',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5'],
  };

  // line, area
  autoScale = true;
  constructor(private myService: CovidInfoService) {}

  ngOnInit(): void {
    this.myService.currentCountryCode.subscribe(
      (data) => ((this.Code = data), this.getCountryList())
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
            value: data.timeseries[timeLine[0]].confirmed,
          },
          {
            name: timeLine[this.getTimeLine(timeLine, 8)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 8)]]
                .confirmed,
          },
          {
            name: timeLine[this.getTimeLine(timeLine, 4)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 4)]]
                .confirmed,
          },

          {
            name: timeLine[this.getTimeLine(timeLine, 1.8)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 1.8)]]
                .confirmed,
          },
          {
            name: timeLine[this.getTimeLine(timeLine, 1.4)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 1.4)]]
                .confirmed,
          },
          {
            name: timeLine[this.getTimeLine(timeLine, 1.2)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 1.2)]]
                .confirmed,
          },
          {
            name: timeLine[timeLine.length - 1],

            value: data.timeseries[timeLine[timeLine.length - 1]].confirmed,
          },
        ],
      },
      {
        name: 'deaths',
        series: [
          {
            name: timeLine[0],
            value: data.timeseries[timeLine[0]].deaths,
          },
          {
            name: timeLine[this.getTimeLine(timeLine, 8)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 8)]].deaths,
          },
          {
            name: timeLine[this.getTimeLine(timeLine, 4)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 4)]].deaths,
          },

          {
            name: timeLine[this.getTimeLine(timeLine, 1.8)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 1.8)]].deaths,
          },
          {
            name: timeLine[this.getTimeLine(timeLine, 1.4)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 1.4)]].deaths,
          },
          {
            name: timeLine[this.getTimeLine(timeLine, 1.2)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 1.2)]].deaths,
          },
          {
            name: timeLine[timeLine.length - 1],
            value: data.timeseries[timeLine[timeLine.length - 1]].deaths,
          },
        ],
      },
      {
        name: 'recovered',
        series: [
          {
            name: timeLine[0],
            value: data.timeseries[timeLine[0]].recovered,
          },
          {
            name: timeLine[this.getTimeLine(timeLine, 8)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 8)]]
                .recovered,
          },
          {
            name: timeLine[this.getTimeLine(timeLine, 4)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 4)]]
                .recovered,
          },
          {
            name: timeLine[this.getTimeLine(timeLine, 1.8)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 1.8)]]
                .recovered,
          },
          {
            name: timeLine[this.getTimeLine(timeLine, 1.4)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 1.4)]]
                .recovered,
          },
          {
            name: timeLine[this.getTimeLine(timeLine, 1.2)],
            value:
              data.timeseries[timeLine[this.getTimeLine(timeLine, 1.2)]]
                .recovered,
          },
          {
            name: timeLine[timeLine.length - 1],
            value: data.timeseries[timeLine[timeLine.length - 1]].recovered,
          },
        ],
      },
    ];
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
