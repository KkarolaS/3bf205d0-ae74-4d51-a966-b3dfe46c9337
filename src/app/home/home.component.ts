import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from '../shared/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent implements OnInit, OnDestroy {
  cities = [];
  dates: Array<string> = [];
  isLoading: boolean;

  loadingSubs: Subscription;
  citySubs: Subscription;
  datesSubs: Subscription;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService.setIsBasket(false);

    this.isLoading = this.eventsService.getIsLoading();
    this.loadingSubs = this.eventsService.loadingChanged.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );

    this.cities = this.eventsService.getCities();
    this.citySubs = this.eventsService.citesChanged.subscribe((items) => {
      this.cities = items;
    });

    let newDates = this.eventsService.getDatesArray();
    this.dates = newDates.map((date) => {
      return new Date(date).toLocaleDateString();
    });

    this.datesSubs = this.eventsService.datesChanged.subscribe((items: []) => {
      let newDates = items;
      this.dates = newDates.map((date) => {
        return new Date(date).toLocaleDateString();
      });
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
    this.citySubs.unsubscribe();
    this.datesSubs.unsubscribe();
  }
}
