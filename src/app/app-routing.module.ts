import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListRegionalComponent } from './home/list-regional/list-regional.component';
import { NewsComponent } from './home/news/news.component';
import { StatisticsComponent } from './home/statistics/statistics.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'statistics', component: StatisticsComponent },
      { path: 'news', component: NewsComponent },
      { path: 'list-regional', component: ListRegionalComponent },
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
