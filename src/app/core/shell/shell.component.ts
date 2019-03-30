import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ShellService } from './shell.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  isLoading: Observable<boolean>;

  constructor(
    private shellService: ShellService,
  ) {
    this.isLoading = this.shellService.isLoading$();
  }

  ngOnInit() {}

}
