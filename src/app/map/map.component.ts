import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CovidInfoService } from '../services/covid-info.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor(private myService: CovidInfoService) {}

  ngOnInit(): void {
    this.createMap();
  }
  async createMap() {
    let myData = await this.getCountryLocation();

    let coordinates: any = [14.058324, 108.277199];
    var myMap = L.map('mapid').setView(coordinates, 3);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '...',
      noWrap: true,
    }).addTo(myMap);
    for (const item of myData) {
      L.circle([item.lat, item.lng], {
        color: '',
        fillColor: '#fa7639',
        fillOpacity: 0.5,
        radius: 200000,
      }).addTo(myMap);
    }
  }
  async getCountryLocation() {
    let data = await this.myService
      .getData2()
      .toPromise()
      .then((data) => {
        return data;
      });
    return data.map((item) => {
      return item.location;
    });
  }
}
