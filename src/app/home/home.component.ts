import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from '../shared/events.service';
import { EventParty } from '../shared/event-party.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent implements OnInit, OnDestroy {
  cities = [];
  dates = [];
  subscription: Subscription;
  datesSubs: Subscription;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.cities = this.getCityArr();
    this.dates = this.getDate();
    console.log(this.dates);
  }

  private getCityArr() {
    let cityArr = [];
    this.subscription = this.eventsService.eventsChanged.subscribe(
      (events: EventParty[]) => {
        events.map((event: EventParty) => {
          if (!cityArr.includes(event.city)) {
            cityArr.push(event.city);
          }
        });
      }
    );
    return cityArr;
  }

  private getDate() {
    let dates = [];

    this.datesSubs = this.eventsService.datesChanged.subscribe((items: []) => {
      items.map((item) => {
        dates.push(item);
      });
    });

    return dates;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.datesSubs.unsubscribe();
  }
}
