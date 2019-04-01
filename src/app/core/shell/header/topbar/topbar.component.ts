import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { UIService } from 'src/app/shared/ui.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

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

  constructor(
    private readonly uiService: UIService,
    private readonly authService: AuthenticationService,
  ) {
    this.isTabletSize = this.uiService.isTabletSize$();
    this.toggleSearch = false;
    this.categoriesCollapsed = true;
  }

  ngOnInit() {}

  onToggleSearch() {
    this.toggleSearch = !this.toggleSearch;
    this.searchField.nativeElement.focus();
  }

  onLogout() {
    this.authService.logout();
  }

}
