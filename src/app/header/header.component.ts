import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from '../shared/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent implements OnInit, OnDestroy {
  eventsNumbers: number;
  subscription: Subscription;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsNumbers = this.eventsService.getShoppingEventsList().length;
    this.subscription = this.eventsService.shoppingEventsListChanged.subscribe(
      (shopList) => {
        this.eventsNumbers = shopList.length;
      }
    );
  }

  onSearchValue(value: string) {
    this.eventsService.setSearchValue(value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
