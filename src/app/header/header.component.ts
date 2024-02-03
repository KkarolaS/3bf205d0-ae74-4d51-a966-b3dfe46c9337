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
  isInBasket: boolean = false;
  subscription: Subscription;
  basketSubs: Subscription;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.isInBasket = this.eventsService.getIsBasket();

    this.basketSubs = this.eventsService.isBasketChanged.subscribe(
      (value: boolean) => {
        this.isInBasket = value;
      }
    );

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

  onBasket() {
    this.isInBasket = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.basketSubs.unsubscribe();
  }
}
