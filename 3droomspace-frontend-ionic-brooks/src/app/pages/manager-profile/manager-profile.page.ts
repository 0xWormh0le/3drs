import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { SetManagerView } from 'src/app/state/manager/manager.action';
import { Navigate } from '@ngxs/router-plugin';
import { RenterState } from 'src/app/state/renter/renter.state';
import { Observable, Subject } from 'rxjs';
import { UserModel } from 'src/app/state/renter/renter-info.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.page.html',
  styleUrls: ['./manager-profile.page.scss'],
})
export class ManagerProfilePage implements OnInit, OnDestroy {
  @Select(RenterState.userInfo) userInfo$: Observable<UserModel>;
  public userInfo: UserModel;
  public ngDestroyed$ = new Subject();

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  goToRenterView() {
    this.store.dispatch(new SetManagerView(false));
    this.store.dispatch( new Navigate(['/tabs/map']));
  }

  goToSearch() {
    this.store.dispatch(new SetManagerView(false));
    this.store.dispatch( new Navigate(['/tabs/map']));
  }

  private getUserInfo() {
    this.userInfo$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(userInfo => {
      this.userInfo = userInfo;
    });
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.unsubscribe();
  }

}
