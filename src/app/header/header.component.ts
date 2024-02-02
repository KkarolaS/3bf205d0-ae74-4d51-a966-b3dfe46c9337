import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from '../shared/events.service';
import { Subscription } from 'rxjs';
// import { Event } from '../home/event.model';
import { GetService } from '../shared/get.service';
import { Event } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent implements OnInit, OnDestroy {
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
      (shopList) => {
        this.eventsNumbers = shopList.length;
      }
    );

    this.isFetching = true;

    this.getService.fetchPost().subscribe(() => {
      this.isFetching = false;
      this.eventsService.eventsChanged.next(this.eventsService.getEvents());
    });
  }

  onSearchValue(value: string) {
    this.eventsService.setSearchValue(value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
