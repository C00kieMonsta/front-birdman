import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ShellService } from './shell.service';
import { EventsService } from '../events/events.service';
import { EventInformation, User } from '../../api/api.model';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  isLoading: Observable<boolean>;
  events: Observable<EventInformation[]>;

  constructor(
    private shellService: ShellService,
    private eventsService: EventsService,
  ) {
    this.isLoading = this.shellService.isLoading$();
  }

  ngOnInit() {
    this.events = this.eventsService.getEventStack$();
  }

}
