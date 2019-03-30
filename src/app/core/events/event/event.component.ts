import { Component, OnInit, Input } from '@angular/core';

import { EventInformation } from '../../../api/api.model';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event: EventInformation;
  showEvent: boolean;

  constructor(private eventsService: EventsService) {
    this.showEvent = true;
  }

  ngOnInit() {
    setTimeout(() => {
      this.eventsService.removeFromEventStack();
    }, 5000);
  }

  getClass() {
    if (this.event) {
      return `alert alert-${this.event.eventStatus} alert-white rounded`;
    }
  }

}
