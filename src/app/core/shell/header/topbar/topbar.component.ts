import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { AppService } from '../../../../app.service';
import { Topic } from '../../../../api/api.model';
import { TopicsService } from '../../../../topics/topics.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @ViewChild('searchField') searchField: ElementRef;

  toggleSearch: boolean;
  categoriesCollapsed: boolean;
  isTabletSize: Observable<boolean>;
  currentTopic: Observable<Topic>;

  constructor(
    private readonly appService: AppService,
    private readonly topicsService: TopicsService
  ) {
    this.isTabletSize = this.appService.isTabletSize$();
    this.currentTopic = this.topicsService.getCurrentTopic$();
    this.toggleSearch = false;
    this.categoriesCollapsed = true;
  }

  ngOnInit() {}

  onToggleSearch() {
    this.toggleSearch = !this.toggleSearch;
    this.searchField.nativeElement.focus();
  }

  resetCurrentTopic() {
    this.topicsService.setCurrentTopic(null);
  }

}
