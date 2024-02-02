import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from '../../shared/events.service';
import { Event } from '../event.model';
import { GetService } from '../../shared/get.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.sass',
})
export class EventsListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  loadedEvents: Event[];
  uniqDatesArray = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.loadedEvents = this.eventsService.getEvents();
    this.loadingEvents();

    this.eventsService.eventsChanged.subscribe((events: Event[]) => {
      this.loadedEvents = events;
      this.loadingEvents();
    });
  }

  private loadingEvents() {
    let datesArray = this.loadedEvents.map((event) => {
      return event.date;
    });
    this.onUniqDatesArr(datesArray);
  }

  private onUniqDatesArr(array) {
    array.forEach((item: string) => {
      if (!this.uniqDatesArray.includes(item)) {
        this.uniqDatesArray.push(item);
      }
    });

    this.uniqDatesArray = this.uniqDatesArray.map((date) => {
      return new Date(date);
    });

    this.uniqDatesArray.sort((a, b) => {
      return a - b;
    });

    this.uniqDatesArray = this.uniqDatesArray.map((item) => {
      return item.toDateString();
    });

    this.eventsService.setDatesArray(this.uniqDatesArray);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ///nazwy i nowe new z returnem ////i new const
}
