import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../event.model';
import { EventsService } from '../../../shared/events.service';

@Component({
  selector: 'app-events-date-wrapper',
  templateUrl: './events-date-wrapper.component.html',
  styleUrl: './events-date-wrapper.component.sass',
})
export class EventsDateWrapperComponent implements OnInit {
  @Input() date: string;
  events: Event[];
  eventsWithSameDate: Event[];

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.events = this.eventsService.getEvents();

    this.eventsWithSameDate = this.events.filter((event) => {
      if (event.date == this.date) {
        return event;
      }
    });
    console.log(this.eventsWithSameDate);
  }
}
