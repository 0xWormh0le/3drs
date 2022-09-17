import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetManagerView } from 'src/app/state/manager/manager.action';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-manager-messages',
  templateUrl: './manager-messages.page.html',
  styleUrls: ['./manager-messages.page.scss'],
})
export class ManagerMessagesPage implements OnInit {

  constructor(
    private store: Store
  ) { }
  ngOnInit() {
  }

  goToSearch() {
    this.store.dispatch(new SetManagerView(false));
    this.store.dispatch( new Navigate(['/tabs/map']));
  }

}
