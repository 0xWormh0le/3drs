import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PropertyState } from 'src/app/state/property/property.state';
import { Observable, Subject } from 'rxjs';
import { Property, PropertyResponse } from 'src/app/state/property/property.state.model';
import { SetSelectedProperty } from 'src/app/state/property/property.action';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit, OnDestroy {
  @Select(PropertyState.properties) properties$: Observable<PropertyResponse[]>;
  public properties: PropertyResponse[];
  public ngDestroyed$ = new Subject();

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.getProperties();
  }

  getProperties() {
    this.properties$.subscribe(data => {
      this.properties = data;
      console.log(this.properties)
    });
  }

  showListingDetails(id: string) {
    this.store.dispatch(new SetSelectedProperty(id));
    this.store.dispatch(new Navigate(['/tabs/listing-detail']));
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.unsubscribe();
  }
}
