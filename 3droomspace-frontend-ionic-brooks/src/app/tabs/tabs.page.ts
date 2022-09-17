import { Component, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { ManagerState } from '../state/manager/manager.state';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { SetManagerView } from '../state/manager/manager.action';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnDestroy {
  @Select(ManagerState.managerView) managerView$: Observable<any>;
  public managerView: boolean;
  public ngDestroyed$ = new Subject();
  public mapDisabled = true;
  public profileDisabled = false;
  public messagesDisabled = false;
  public saveDisabled = false;
  public listingsDisabled = true;
  public calendarDisabled = false;
  public managerMessagesDisabled = false;
  public managerProfileDisabled = false;

  constructor(
    private store: Store,
    private router: Router
    ) {
    this.getView();
  }

  private getView() {
    this.managerView$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      this.managerView = data.ManagerView;
      this.setManagerHome();
    });
  }

  setManagerHome() {
    if (!this.managerView) {
      this.listingsDisabled = true;
      this.calendarDisabled = false;
      this.managerMessagesDisabled = false;
      this.managerProfileDisabled = false;    }
  }

  goToSaved() {
    this.mapDisabled = false;
    this.profileDisabled = false;
    this.messagesDisabled = false;
    this.saveDisabled = true;
    this.store.dispatch(new SetManagerView(false));
    this.store.dispatch( new Navigate(['/tabs/map']));
  }

  goToMyProfile() {
    this.mapDisabled = false;
    this.profileDisabled = true;
    this.messagesDisabled = false;
    this.saveDisabled = false;
    this.store.dispatch(new SetManagerView(false));
    this.store.dispatch( new Navigate(['/tabs/my-profile']));
  }

  goToMessages() {
    this.mapDisabled = false;
    this.profileDisabled = false;
    this.messagesDisabled = true;
    this.saveDisabled = false;
    this.store.dispatch(new SetManagerView(false));
    this.store.dispatch( new Navigate(['/tabs/messages']));
  }

  goToMap() {
    this.mapDisabled = true;
    this.profileDisabled = false;
    this.messagesDisabled = false;
    this.saveDisabled = false;
    this.store.dispatch(new SetManagerView(false));
    this.store.dispatch( new Navigate(['/tabs/map']));
  }

  goToListings() {
    this.listingsDisabled = true;
    this.calendarDisabled = false;
    this.managerMessagesDisabled = false;
    this.managerProfileDisabled = false;
    this.store.dispatch(new SetManagerView(true));
    this.store.dispatch( new Navigate(['/tabs/manager-home']));
  }

  goToCalendar() {
    this.listingsDisabled = false;
    this.calendarDisabled = true;
    this.managerMessagesDisabled = false;
    this.managerProfileDisabled = false;
    this.store.dispatch(new SetManagerView(true));
    this.store.dispatch( new Navigate(['/tabs/manager-calendar']));
  }

  public goToManagerMessages() {
    this.listingsDisabled = false;
    this.calendarDisabled = false;
    this.managerMessagesDisabled = true;
    this.managerProfileDisabled = false;
    this.store.dispatch(new SetManagerView(true));
    this.store.dispatch( new Navigate(['/tabs/manager-messages']));
  }

  public goToManagerProfile() {
    this.listingsDisabled = false;
    this.calendarDisabled = false;
    this.managerMessagesDisabled = false;
    this.managerProfileDisabled = true;
    this.store.dispatch(new SetManagerView(true));
    this.store.dispatch( new Navigate(['/tabs/manager-profile']));
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.unsubscribe();
  }


}
