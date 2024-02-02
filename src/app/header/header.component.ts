import { Component, OnInit } from '@angular/core';
import { EventsService } from '../shared/events.service';
import { Subscription } from 'rxjs';
import { Event } from '../home/event.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent implements OnInit {
  eventsNumbers: number;
  subscription: Subscription;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsNumbers = this.eventsService.getShoppingEventsList().length;

    this.subscription = this.eventsService.shoppingEventsListChanged.subscribe(
      (shopList: Event[]) => {
        this.eventsNumbers = shopList.length;
      }
    );
  }
}
