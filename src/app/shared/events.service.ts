import { Injectable } from '@angular/core';
import { Event } from '../home/event.model';
import { Subject } from 'rxjs';

@Injectable()
export class EventsService {
  eventsChanged = new Subject<Event[]>();

  datesArray: [] = [];
  private events: Event[] = [];
  private shoppingEventsList: Event[] = [];

  private filters = [];

  setEvents(newEvents: Event[]) {
    newEvents = newEvents.map((event) => {
      if (event.startTime) {
        const startTime = new Date(event.startTime);
        event.startTime = this.setDateFormat(startTime);
      } else {
        event.startTime = null;
      }

      if (event.endTime) {
        const endTime = new Date(event.endTime);
        event.endTime = this.setDateFormat(endTime);
      } else {
        event.endTime = null;
      }
      event.date = new Date(event.date).toDateString();
      return event;
    });
    this.events = newEvents;
    this.eventsChanged.next(this.events.slice());
  }

  setDatesArray(array) {
    this.datesArray = array;
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
  }

  getShoppingEventsList() {
    return this.shoppingEventsList.slice();
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
