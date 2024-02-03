import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from '../../shared/events.service';
import { EventParty } from '../../shared/event-party.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.sass',
})
export class EventsListComponent implements OnInit, OnDestroy {
  errorOccured: boolean;
  isLoading: boolean;

  subscription: Subscription;
  errSubs: Subscription;
  loadingSubs: Subscription;

  loadedEvents: EventParty[];
  uniqDatesArray = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.isLoading = this.eventsService.getIsLoading();
    this.loadingSubs = this.eventsService.loadingChanged.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );

    this.errorOccured = this.eventsService.getError();
    this.errSubs = this.eventsService.errorChanged.subscribe(
      (isError: boolean) => {
        this.errorOccured = isError;
      }
    );

    this.loadedEvents = this.eventsService.getEvents();
    this.loadingEvents();
    this.subscription = this.eventsService.eventsChanged.subscribe(
      (events: EventParty[]) => {
        this.loadedEvents = events;
        this.loadingEvents();
      }
    );
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
    this.eventsService.datesChanged.next(this.eventsService.datesArray);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.errSubs.unsubscribe();
  }
  ///nazwy i nowe new z returnem ////i new const
}
