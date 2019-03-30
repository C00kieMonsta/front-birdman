import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServerError } from '../../../../api/api.model';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss']
})
export class PageErrorComponent implements OnInit {

  errorMessage = 'Page not found';
  errorStatus = 404;
  errorName = 'Error';
  routeParams;
  data;
  isAuthenticated: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeParams = this.route.snapshot.queryParams as ServerError;
    if (Object.keys(this.routeParams).length !== 0) {
      this.errorMessage = this.routeParams.message;
      this.errorStatus = +this.routeParams.status;
      this.errorName = this.routeParams.name;
    }
  }

  onPressBack() {
    this.router.navigate(['/']);
  }
}
