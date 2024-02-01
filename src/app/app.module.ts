import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { EventsListComponent } from './home/events-list/events-list.component';
import { EventItemComponent } from './home/events-list/event-item/event-item.component';
import { BasketComponent } from './basket/basket.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, EventsListComponent, EventItemComponent, BasketComponent],
  imports: [BrowserModule, TooltipModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
