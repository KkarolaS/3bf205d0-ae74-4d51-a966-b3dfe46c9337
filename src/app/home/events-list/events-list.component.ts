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

  events: EventParty[];
  uniqDatesArray: Array<string> = [];

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

    this.events = this.eventsService.getEvents();
    this.uniqDatesArray = this.getUniqDatesAss(this.events);
    this.eventsService.setDatesArray(this.uniqDatesArray);
    this.eventsService.datesChanged.next(this.eventsService.datesArray);

    this.subscription = this.eventsService.eventsChanged.subscribe(
      (events: EventParty[]) => {
        this.events = events;
        this.uniqDatesArray = this.getUniqDatesAss(this.events);
        this.eventsService.setDatesArray(this.uniqDatesArray);
        this.eventsService.datesChanged.next(this.eventsService.datesArray);
      }
    );
  }

  private getUniqDatesAss(events: EventParty[]) {
    let datesArray: Array<string> = this.events.map((event) => {
      return event.date;
    });
    return this.onUniqDatesArr(datesArray);
  }

  private onUniqDatesArr(array: Array<string>) {
    let newUniqDatesArr: Array<string> = [];

    array.forEach((item: string) => {
      if (!newUniqDatesArr.includes(item)) {
        newUniqDatesArr.push(item);
      }
    });

    let newUniqArrDate: Array<any> = newUniqDatesArr.map((date) => {
      return new Date(date);
    });

    newUniqArrDate.sort((a, b) => {
      return a - b;
    });

    newUniqDatesArr = newUniqArrDate.map((item: Date) => {
      return item.toDateString();
    });

    return newUniqDatesArr;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.errSubs.unsubscribe();
  }
}
