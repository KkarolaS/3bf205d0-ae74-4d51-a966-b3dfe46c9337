import { Injectable } from '@angular/core';
import { Event } from '../home/event.model';
import { Subject } from 'rxjs';

@Injectable()
export class EventsService {
  eventsChanged = new Subject<Event[]>();
  private events: Event[] = [];

  private filters = [];

  setEvents(newEvents: Event[]) {
    this.events = newEvents;
    this.eventsChanged.next(this.events);
  }

  getEvents() {
    this.eventsChanged.next(this.events);
    return this.events.slice();
  }

  getEvent(index: number) {
    return this.events[index];
  }
}
