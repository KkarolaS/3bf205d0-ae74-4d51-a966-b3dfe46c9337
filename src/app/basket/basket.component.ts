import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from '../shared/events.service';
import { EventParty } from '../shared/event-party.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.sass',
})
export class BasketComponent implements OnInit, OnDestroy {
  shoppingEventsList: EventParty[];
  subscription: Subscription;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.shoppingEventsList = this.eventsService.getShoppingEventsList();

    this.subscription = this.eventsService.shoppingEventsListChanged.subscribe(
      (shopEvents: EventParty[]) => {
        this.shoppingEventsList = shopEvents;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
