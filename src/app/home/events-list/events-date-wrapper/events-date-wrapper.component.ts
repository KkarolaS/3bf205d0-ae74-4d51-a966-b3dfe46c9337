import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Event } from '../../event.model';
import { EventsService } from '../../../shared/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-date-wrapper',
  templateUrl: './events-date-wrapper.component.html',
  styleUrl: './events-date-wrapper.component.sass',
})
export class EventsDateWrapperComponent implements OnInit, OnDestroy {
  @Input() date: string;
  subscription: Subscription;
  events: Event[];
  eventsWithSameDate: Event[];

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.events = this.eventsService.getEvents();

    this.subscription = this.eventsService.eventsChanged.subscribe(
      (events: Event[]) => {
        this.events = events;
        this.filterEvents(events);
      }
    );

    this.filterEvents(this.events);
  }

  private filterEvents(events: Event[]) {
    this.eventsWithSameDate = events.filter((event) => {
      if (event.date === this.date) {
        return event;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
