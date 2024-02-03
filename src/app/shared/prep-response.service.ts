import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { EventsService } from './events.service';
import { EventParty } from './event-party.model';
import { FetchService } from './fetch.service';

@Injectable()
export class PrepResponseService {
  constructor(
    private fetch: FetchService,
    private eventsService: EventsService
  ) {}

  prepEventsResp() {
    return this.fetch.getEvents().pipe(
      map((events) => {
        return events.map((event) => {
          const eventTtitle: string = event['title'];
          const eventDate: string = event['date'];
          const eventCity: string = event['city'];
          const eventImgUrl: string = event['flyerFront'];
          const eventDirectionUrl: string = event['venue'].direction;
          const eventDirectionName: string = event['venue'].name;
          const eventStartTime: string = event['startTime'];
          const eventEndTime: string = event['endTime'];

          let newEvent: EventParty;
          if (!event['private']) {
            newEvent = new EventParty(
              eventTtitle,
              eventDate,
              eventCity,
              eventImgUrl,
              eventDirectionUrl,
              eventDirectionName,
              eventStartTime,
              eventEndTime
            );
          }

          return {
            ...newEvent,
            imgUrl: eventImgUrl !== undefined ? eventImgUrl : null,
            startTime:
              eventStartTime !== undefined || null ? eventStartTime : '',
            endTime: eventEndTime !== undefined || null ? eventEndTime : '',
          };
        });
      }),
      tap((events) => {
        this.eventsService.setEvents(events);
      })
    );
  }
}
