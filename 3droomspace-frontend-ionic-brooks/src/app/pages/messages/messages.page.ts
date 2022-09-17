import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetManagerView } from 'src/app/state/manager/manager.action';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
  }

}
