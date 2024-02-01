import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../event.model';
import { EventsService } from '../../../../shared/events.service';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.sass',
})
export class EventItemComponent implements OnInit {
  @Input() event: Event;
  isStartTime: boolean = false;

  ngOnInit(): void {
    if (this.event.imgUrl === '') {
      this.event.imgUrl = 'https://picsum.photos/id/117/200/300';
    }

    this.timeCheck(this.event.startTime);
    this.timeCheck(this.event.endTime);
  }

  private timeCheck(time) {
    if (time !== null) {
      this.isStartTime = true;
    } else {
      this.isStartTime = false;
    }
  }
}
