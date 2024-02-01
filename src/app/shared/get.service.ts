import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { EventsService } from './events.service';
import { Event } from '../home/event.model';

@Injectable()
export class GetService {
  constructor(private http: HttpClient, private eventsService: EventsService) {}

  fetchPost() {
    return this.http
      .get<Event[]>(
        'https://teclead-ventures.github.io/data/london-events.json'
      )
      .pipe(
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

            let newEvent: Event;
            if (!event['private']) {
              newEvent = new Event(
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
              imgUrl:
                eventImgUrl !== undefined || eventImgUrl != null
                  ? eventImgUrl
                  : '',
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
