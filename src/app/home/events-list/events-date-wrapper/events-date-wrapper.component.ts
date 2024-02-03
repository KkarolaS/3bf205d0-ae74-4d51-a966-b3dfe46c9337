import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventParty } from '../../../shared/event-party.model';
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
  searchSubscr: Subscription;
  events: EventParty[];
  eventsWithSameDate: EventParty[];
  searchValue: string = '';

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.events = this.eventsService.getEvents();
    this.searchValue = this.eventsService.getSearchValue();

    this.subscription = this.eventsService.eventsChanged.subscribe(
      (events: EventParty[]) => {
        this.events = events;
        this.filterEvents(events);
      }
    );

    this.filterEvents(this.events);
  }

  private filterEvents(events: EventParty[]) {
    this.eventsWithSameDate = events.filter((event) => {
      if (event.date === this.date) {
        return event;
      }
    });

    this.searchSubscr = this.eventsService.searchValueChanged.subscribe(
      (value: string) => {
        this.searchValue = value;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.searchSubscr.unsubscribe();
  }
}
