import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WorldWideComponent } from './world-wide/world-wide.component';
import { RegionalComponent } from './regional/regional.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WorldWideComponent,
    RegionalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
