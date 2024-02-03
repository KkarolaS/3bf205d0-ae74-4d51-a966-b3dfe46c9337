import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { EventsListComponent } from './home/events-list/events-list.component';
import { EventItemComponent } from './home/events-list/events-date-wrapper/event-item/event-item.component';
import { BasketComponent } from './basket/basket.component';

import { EventsService } from './shared/events.service';
import { PrepResponseService } from './shared/prep-response.service';
import { EventsDateWrapperComponent } from './home/events-list/events-date-wrapper/events-date-wrapper.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './shared/filter.pipe';
import { FetchService } from './shared/fetch.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    EventsListComponent,
    EventItemComponent,
    BasketComponent,
    EventsDateWrapperComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    TooltipModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [EventsService, PrepResponseService, FetchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
