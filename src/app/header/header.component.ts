import { Component, OnInit } from '@angular/core';
import { EventsService } from '../shared/events.service';
import { Subscription } from 'rxjs';
import { Event } from '../home/event.model';
import { GetService } from '../shared/get.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent implements OnInit {
  isFetching: boolean = false;

  eventsNumbers: number;
  subscription: Subscription;

  constructor(
    private getService: GetService,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.eventsNumbers = this.eventsService.getShoppingEventsList().length;

    this.subscription = this.eventsService.shoppingEventsListChanged.subscribe(
      (shopList: Event[]) => {
        this.eventsNumbers = shopList.length;
      }
    );

    this.isFetching = true;

    this.getService.fetchPost().subscribe(() => {
      this.isFetching = false;
      this.eventsService.eventsChanged.next(this.eventsService.getEvents());
    });
  }
}
