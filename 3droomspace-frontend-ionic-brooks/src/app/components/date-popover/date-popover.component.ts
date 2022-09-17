import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-popover',
  templateUrl: './date-popover.component.html',
  styleUrls: ['./date-popover.component.scss'],
})
export class DatePopoverComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  datesClicked() {
    console.log('dates clicked')
  }

}
