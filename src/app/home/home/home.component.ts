import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ArticleHighlight, User } from '../../api/api.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articlesHighlights: Observable<ArticleHighlight[]>;
  currentUser: User;
  tags: string[];

  constructor(private readonly homeService: HomeService) {
    this.articlesHighlights = this.homeService.getArticlesHighlights$();
    this.tags = [];
  }

  ngOnInit() {}

}
