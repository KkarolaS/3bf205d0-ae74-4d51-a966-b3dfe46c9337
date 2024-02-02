import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../home/event.model';

@Pipe({ name: 'searchEventPipe' })
export class FilterPipe implements PipeTransform {
  transform(events: Event[], searchValue: string): Event[] {
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
