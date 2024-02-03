import { Pipe, PipeTransform } from '@angular/core';
import { EventParty } from './event-party.model';

@Pipe({ name: 'searchEventPipe' })
export class FilterPipe implements PipeTransform {
  transform(events: EventParty[], searchValue: string): EventParty[] {
    if (!events) {
      return [];
    }
    if (!searchValue) {
      return events;
    }
    searchValue = searchValue.toLocaleLowerCase();

    return events.filter((event) => {
      return event.title.toLocaleLowerCase().includes(searchValue);
    });
  }
}
