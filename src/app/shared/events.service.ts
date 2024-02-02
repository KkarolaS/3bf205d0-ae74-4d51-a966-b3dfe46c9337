import { Injectable } from '@angular/core';
import { Event } from '../home/event.model';
import { Subject } from 'rxjs';

@Injectable()
export class EventsService {
  eventsChanged = new Subject<Event[]>();
  shoppingEventsListChanged = new Subject<Event[]>();
  searchValueChanged = new Subject<string>();

  datesArray: [] = [];
  private events: Event[] = [];
  private shoppingEventsList: Event[] = [];

  private searchValue: string = '';

  setEvents(newEvents: Event[]) {
    newEvents = newEvents.map((event) => {
      event.startTime = this.onCheckDateFormat(event.startTime);
      event.endTime = this.onCheckDateFormat(event.endTime);

      event.date = new Date(event.date).toDateString();
      return event;
    });
    this.events = newEvents;
    this.eventsChanged.next(this.events.slice());
  }

  setDatesArray(array) {
    this.datesArray = array;
  }

  setSearchValue(value: string) {
    this.searchValue = value;
    this.searchValueChanged.next(this.searchValue);
  }

  getEvents() {
    return this.events.slice();
  }

  getEvent(index: number) {
    return this.events[index];
  }

  addToShoppingEventsList(event: Event) {
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

  private setDateFormat(date) {
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
