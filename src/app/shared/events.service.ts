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
  isBasketChanged = new Subject<boolean>();
  datesChanged = new Subject<[]>();
  citesChanged = new Subject<Array<string>>();

  private datesArray: [] = [];
  private events: EventParty[] = [];
  private shoppingEventsList: EventParty[] = [];
  private searchValue: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private cities: Array<string> = [];
  private isInBasket: boolean;

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
    this.cities = this.setCities(this.events);
    this.citesChanged.next(this.cities);
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

  setIsBasket(value: boolean) {
    this.isInBasket = value;
    this.isBasketChanged.next(this.isInBasket);
  }

  getIsBasket() {
    return this.isInBasket;
  }

  setDatesArray(array) {
    this.datesArray = array;
    this.datesChanged.next(this.datesArray);
  }

  getDatesArray() {
    return this.datesArray;
  }

  getCities() {
    return this.cities;
  }

  addToShoppingEventsList(event: EventParty) {
    this.shoppingEventsList.push(event);
    this.events = this.events.filter((item) => {
      return item !== event;
    });
    this.eventsChanged.next(this.events.slice());
    this.shoppingEventsListChanged.next(this.shoppingEventsList.slice());
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

  private setCities(events: EventParty[]) {
    let cityArr = [];
    events.map((event: EventParty) => {
      if (!cityArr.includes(event.city)) {
        cityArr.push(event.city);
      }
    });

    return cityArr;
  }
}
