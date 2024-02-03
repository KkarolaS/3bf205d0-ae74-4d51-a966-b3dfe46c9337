import { Component, Input, OnInit } from '@angular/core';
import { EventParty } from '../../../../shared/event-party.model';
import { EventsService } from '../../../../shared/events.service';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.sass',
})
export class EventItemComponent implements OnInit {
  @Input() event: EventParty;
  @Input() isInBasket: boolean;
  isStartTime: boolean = false;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    if (this.event.imgUrl === null) {
      this.event.imgUrl = 'https://picsum.photos/id/117/286/400';
    }

    this.timeCheck(this.event.startTime);
    this.timeCheck(this.event.endTime);
  }

  onAddEvent() {
    this.eventsService.addToShoppingEventsList(this.event);
  }

  private timeCheck(time) {
    if (time !== null) {
      this.isStartTime = true;
    } else {
      this.isStartTime = false;
    }
  }
}
