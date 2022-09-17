import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetManagerView } from 'src/app/state/manager/manager.action';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  constructor(
    private store: Store
  ) { }

  ngOnInit() {}

  goToSearch() {
    this.store.dispatch(new SetManagerView(false));
    this.store.dispatch( new Navigate(['/tabs/map']));
  }
}
