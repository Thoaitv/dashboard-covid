import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { StatisticsComponent } from './statistics/statistics.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { ChartsComponent } from './charts/charts.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountUpModule } from 'ngx-countup';

@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    MapComponent,
    ChartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    CountUpModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
