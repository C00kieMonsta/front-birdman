import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-item-selected',
  templateUrl: './no-item-selected.component.html',
  styleUrls: ['./no-item-selected.component.scss']
})
export class NoItemSelectedComponent implements OnInit {

  @Input() message: string;

  constructor() {
    this.message = 'No Items';
  }

  ngOnInit() {}

}
