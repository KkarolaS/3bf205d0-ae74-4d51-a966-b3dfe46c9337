import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../shared/events.service';
import { Event } from '../event.model';
import { GetService } from '../../shared/get.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.sass',
})
export class EventsListComponent implements OnInit {
  isFetching: boolean = false;
  subscription: Subscription;
  loadedEvents: Event[];
  uniqDatesArray = [];

  constructor(
    private eventsService: EventsService,
    private getService: GetService
  ) {}

  ngOnInit(): void {
    this.isFetching = true;

    this.getService.fetchPost().subscribe(() => {
      this.isFetching = false;
      this.loadedEvents = this.eventsService.getEvents();

      let datesArray = this.loadedEvents.map((event) => {
        return event.date;
      });

      this.onUniqDatesArr(datesArray);
    });
  }

  private onUniqDatesArr(array) {
    array.forEach((item: string) => {
      if (!this.uniqDatesArray.includes(item)) {
        this.uniqDatesArray.push(item);
      }
    });

    this.uniqDatesArray = this.uniqDatesArray.map((date) => {
      return new Date(date);
    });

    this.uniqDatesArray.sort((a, b) => {
      return a - b;
    });

    this.uniqDatesArray = this.uniqDatesArray.map((item) => {
      return item.toDateString();
    });

    this.eventsService.setDatesArray(this.uniqDatesArray);
  }
}
