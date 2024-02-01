import { Injectable } from '@angular/core';
import { Event } from '../home/event.model';

@Injectable()
export class EventsService {
  private events: Event[] = [];

  private filters = [];

  setEvents(newEvents: Event[]) {
    this.events = newEvents;
    console.log(this.events);
  }

  getEvents() {
    return this.events;
  }

  getEvent(index: number) {
    return this.events[index];
  }
}
