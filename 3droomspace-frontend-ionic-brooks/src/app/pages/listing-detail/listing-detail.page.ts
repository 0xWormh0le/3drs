import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { PropertyState } from 'src/app/state/property/property.state';
import { Property } from 'src/app/state/property/property.state.model';
import { Navigate } from '@ngxs/router-plugin';
import { takeUntil } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { SetManagerView } from 'src/app/state/manager/manager.action';


@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.page.html',
  styleUrls: ['./listing-detail.page.scss'],
})
export class ListingDetailPage implements OnInit, OnDestroy {
  @Select(PropertyState.selectedProperty) selectedProperty$: Observable<Property>;
  photo;
  public ngDestroyed$ = new Subject();
  public selectedProperty;
  constructor(private store: Store, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getSelectedProperty();
  }

  getSelectedProperty() {
    this.selectedProperty$
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(data => {
        this.selectedProperty = data;
        console.log('this.selectedProperty.image = ');
        console.log(this.selectedProperty.image);
      });
  }

  goToMapView() {
    this.store.dispatch(new SetManagerView(true));
    this.store.dispatch(new Navigate(['/tabs/map']));
  }

  goToMessaging() {
    this.store.dispatch(new Navigate(['/tabs/messages']));
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.unsubscribe();
  }

}
