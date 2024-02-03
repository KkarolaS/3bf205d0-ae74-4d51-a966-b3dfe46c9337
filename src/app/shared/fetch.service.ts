import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { EventParty } from './event-party.model';

@Injectable()
export class FetchService {
  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get<EventParty[]>(
      'https://teclead-ventures.github.io/data/london-events.json'
    );
  }
}
