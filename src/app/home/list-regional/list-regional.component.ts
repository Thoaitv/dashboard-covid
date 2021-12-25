import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CovidInfoService } from 'src/app/services/covid-info.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-list-regional',
  templateUrl: './list-regional.component.html',
  styleUrls: ['./list-regional.component.css']
})

export class ListRegionalComponent implements OnInit {
  coronaData: any;
  fatalityRate: any;
  countryList: any;
  option: any;
  allCase: any;
  allCaseRate: any;
  p = 1;

  constructor(private myService: CovidInfoService) {

  }


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


  title = 'FA-Corona';
  isListCountries: boolean = false;
  isConntry: boolean = true;
  @ViewChild('htmlData') htmlData!: ElementRef;

  showListCountries() {
    this.isListCountries = true;
    this.isConntry = false;
  }
  showCountry() {
    this.isListCountries = false;
    this.isConntry = true;
  }

  fileName = 'List Country.xlsx';
  exportexcel() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);

  }

  public exportPDF() {
    let data: any = document.getElementById('pdfTable');
    html2canvas(data).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('list country.pdf');
    });
  }

}
