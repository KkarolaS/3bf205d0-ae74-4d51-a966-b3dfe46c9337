import { Injectable } from '@angular/core';
import { EventParty } from './event-party.model';
import { Subject } from 'rxjs';

@Injectable()
export class EventsService {
  eventsChanged = new Subject<EventParty[]>();
  shoppingEventsListChanged = new Subject<EventParty[]>();
  searchValueChanged = new Subject<string>();
  errorChanged = new Subject<boolean>();
  loadingChanged = new Subject<boolean>();
  datesChanged = new Subject<[]>();

  datesArray: [] = [];
  private events: EventParty[] = [];
  private shoppingEventsList: EventParty[] = [];
  private searchValue: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;

  setIsLoading(loading: boolean) {
    this.isLoading = loading;
    this.loadingChanged.next(this.isLoading);
  }

  getIsLoading() {
    return this.isLoading;
  }

  setEvents(newEvents: EventParty[]) {
    newEvents = newEvents.map((event) => {
      event.startTime = this.onCheckDateFormat(event.startTime);
      event.endTime = this.onCheckDateFormat(event.endTime);

      event.date = new Date(event.date).toDateString();
      return event;
    });
    this.events = newEvents;
    this.eventsChanged.next(this.events.slice());
  }

  getEvents() {
    return this.events.slice();
  }

  getEvent(index: number) {
    return this.events[index];
  }

  setErrror(errorHappend: boolean) {
    this.isError = errorHappend;
    this.errorChanged.next(this.isError);
  }

  getError() {
    return this.isError;
  }

  setDatesArray(array) {
    this.datesArray = array;
  }

  addToShoppingEventsList(event: EventParty) {
    this.shoppingEventsList.push(event);
    this.events = this.events.filter((item) => {
      return item !== event;
    });
    this.eventsChanged.next(this.events.slice());
    this.shoppingEventsListChanged.next(this.shoppingEventsList.slice());
    console.log(this.shoppingEventsList.length);
  }

  getShoppingEventsList() {
    return this.shoppingEventsList.slice();
  }

  setSearchValue(value: string) {
    this.searchValue = value;
    this.searchValueChanged.next(this.searchValue);
  }

  getSearchValue() {
    return this.searchValue;
  }

  private onCheckDateFormat(time: string) {
    if (time) {
      const newTime = new Date(time);
      time = this.setDateFormat(newTime);
      return time;
    } else {
      return (time = null);
    }
  }

  private setDateFormat(date: Date) {
    const day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
    const month = `${date.getMonth() < 10 ? '0' : ''}${date.getMonth()}`;
    const year = date.getFullYear();
    const hour = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}`;
    const minutes = `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
    const seconds = `${date.getSeconds() < 10 ? '0' : ''}${date.getSeconds()}`;
    const time = `${hour}:${minutes}:${seconds}`;

    return `${day}.${month}.${year}, ${time}`;
  }
}
