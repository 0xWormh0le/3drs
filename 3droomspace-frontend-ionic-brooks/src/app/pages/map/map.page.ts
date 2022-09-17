import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DatePopoverComponent } from 'src/app/components/date-popover/date-popover.component';
import { TypePopoverComponent } from 'src/app/components/type-popover/type-popover.component';
import { PricePopoverComponent } from 'src/app/components/price-popover/price-popover.component';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Subject } from 'rxjs';
import { AgmGeocoder } from '@agm/core';
import { SetMapLocation } from 'src/app/state/map/map.action';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  public ngDestroyed$ = new Subject();
  displayListView = false;

  constructor(
    public popoverController: PopoverController,
    private store: Store,
    private agmGeocoder: AgmGeocoder,

  ) { }

  ngOnInit() {
  }

  handleAddressChange(event) {
    console.log(event);
    this.store.dispatch(new SetMapLocation({
      centerCoordinates: {
        latitude: event.geometry.location.lat(),
        longitude: event.geometry.location.lng()
      },
      zoom: 11
    }));
  }

  private getPlaceAutocomplete(addressEntered: string) {
    return this.agmGeocoder.geocode({ address: addressEntered });
  }

  async presentDatePopover(ev: any) {
    const popover = await this.popoverController.create({
      component: DatePopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async presentTypePopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TypePopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async presentPricePopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PricePopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  goToMyProfile() {
    this.store.dispatch(new Navigate(['/my-profile']));
  }

  goToMessages() {
    this.store.dispatch(new Navigate(['/messages']));
  }

  ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.unsubscribe();
  }
}
