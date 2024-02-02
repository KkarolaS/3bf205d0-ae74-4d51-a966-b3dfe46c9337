import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from '../shared/events.service';
import { Event } from '../home/event.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.sass',
})
export class BasketComponent implements OnInit, OnDestroy {
  shoppingEventsList: Event[];
  subscription: Subscription;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.shoppingEventsList = this.eventsService.getShoppingEventsList();

    this.subscription = this.eventsService.shoppingEventsListChanged.subscribe(
      (shopEvents: Event[]) => {
        this.shoppingEventsList = shopEvents;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
