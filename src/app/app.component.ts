import { Component, OnInit } from '@angular/core';
import { PrepResponseService } from './shared/prep-response.service';
import { EventsService } from './shared/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
  title = 'event-app';

  constructor(
    private prepRespService: PrepResponseService,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.eventsService.setIsLoading(true);

    this.prepRespService.prepEventsResp().subscribe(
      () => {
        this.eventsService.setIsLoading(false);
        this.eventsService.eventsChanged.next(this.eventsService.getEvents());
      },
      (error) => {
        this.eventsService.setIsLoading(false);
        this.eventsService.setErrror(true);
      }
    );
  }
}
