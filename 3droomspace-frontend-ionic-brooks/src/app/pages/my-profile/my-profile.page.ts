import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RenterState } from 'src/app/state/renter/renter.state';
import { Observable, Subject } from 'rxjs';
import { UserModel } from 'src/app/state/renter/renter-info.model';
import { takeUntil } from 'rxjs/operators';
import { SetManagerView } from 'src/app/state/manager/manager.action';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit, OnDestroy {
  @Select(RenterState.userInfo) userInfo$: Observable<UserModel>;
  public userInfo: UserModel;
  public ngDestroyed$ = new Subject();

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  goToManagerHome() {
    this.store.dispatch(new SetManagerView(true));
    this.store.dispatch(new Navigate(['/tabs/manager-home']));
  }

  getUserInfo() {
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
