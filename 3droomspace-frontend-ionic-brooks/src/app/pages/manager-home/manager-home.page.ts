import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AgmGeocoder } from '@agm/core';
import { Store } from '@ngxs/store';
import { AddNewProperty, SetSelectedProperty } from 'src/app/state/property/property.action';
import { Navigate } from '@ngxs/router-plugin';
import { Property, AddrObj } from 'src/app/state/property/property.state.model';
import { SetManagerView } from 'src/app/state/manager/manager.action';
import { Camera, CameraResultType } from '@capacitor/core';
import * as firebase from 'firebase/app';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SetMapLocation } from 'src/app/state/map/map.action';
import { types } from 'util';
import { RenterState } from '../../state/renter/renter.state';
import { PropertyService } from 'src/app/services/property/property.service';
import { v4 as uuidv4 } from 'uuid';




@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.page.html',
  styleUrls: ['./manager-home.page.scss'],
})
export class ManagerHomePage implements OnInit, OnDestroy {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  public ngDestroyed$ = new Subject();
  public listPropertyForm: FormGroup;
  public photos: any[] = [];
  public propertyId;

  constructor(
    private formBuilder: FormBuilder,
    private agmGeocoder: AgmGeocoder,
    private store: Store,
    public propertyService: PropertyService
  ) {
    this.listPropertyForm = this.formBuilder.group({
      address: ['', [Validators.required]],
      listingType: ['', [Validators.required]],
      propertyType: ['', [Validators.required]],
      listingName: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  handleAddressChange(event) {
    // this.store.dispatch(new SetMapLocation({
    //   latitude: event.geometry.location.lat(),
    //   longitude: event.geometry.location.lng()
    // }));
    this.listPropertyForm.patchValue({ address: event.formatted_address });
  }

  ngOnInit() {
  }

  private getPlaceAutocomplete(addressEntered: string) {
    return this.agmGeocoder.geocode({ address: addressEntered });
  }




  listProperty() {
    const addressData = this.getPlaceAutocomplete(this.listPropertyForm.value.address);
    addressData
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(data => {
        console.log(data);
        const types = {
          street_number: 'address_line1',
          route: 'address_line1',
          locality: 'city',
          administrative_area_level_1: 'state',
          postal_code: 'postal_code'
        };

        const addrObj: AddrObj = data[0].address_components.reduce((acc, cur) => {
          const isDesiredType = cur.types.some(t => Object.keys(types).includes(t));
          const grabKey = addressComponent => addressComponent.types.reduce((acc, cur) => acc ? acc : types[cur], null);
          return isDesiredType ? {
            ...acc,
            [grabKey(cur)]: ((acc[grabKey(cur)] && (acc[grabKey(cur)] + ' ')) || '') + cur.long_name
          } : acc;
        }, {});

        const userInfo = this.store.selectSnapshot(RenterState.userInfo);
        const userId = userInfo.id;
        console.log(userInfo, userId);

        this.listPropertyForm.patchValue({ address: data[0].formatted_address });
        const newProperty = Object.assign(
          this.createNewProperty(
            this.listPropertyForm.value,
            data[0].geometry.location.lat(),
            data[0].geometry.location.lng()
          ), {
            userId,
            addrObj,
            photos: this.photos
          }
        );
        this.store.dispatch(new AddNewProperty(newProperty));
        this.store.dispatch(new SetSelectedProperty(newProperty.id));
        this.store.dispatch(new SetManagerView(false));
        this.listPropertyForm.reset();
        this.store.dispatch(new Navigate(['/tabs/map']));
      });
  }

  getId() {
    if (!this.propertyId) {
      this.propertyId = uuidv4();
    }
    return this.propertyId;
  }

  createNewProperty(formData, lat: number, lng: number): Property {
    const newProperty: Property = {
      image: this.photos[0],
      address: formData.address,
      desc: formData.description,
      id: this.getId(),
      price: formData.price,
      latitude: lat,
      longitude: lng,
    };
    return newProperty;
  }

  async addFile() { }

  async addPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    this.photos.push(image.dataUrl);
  }

  async upload(photo): Promise<string> {
    const storageRef = firebase
      .storage()
      .ref(`/pictures/${Math.random().toString()}.png`);
    const uploadedPicture = await storageRef.putString(photo, 'base64', {
      contentType: 'image/png'
    });
    const downloadURL: string = await storageRef.getDownloadURL();
    return downloadURL;

  }

  goToSearch() {
    this.store.dispatch(new SetManagerView(false));
    this.store.dispatch(new Navigate(['/tabs/map']));
  }

  ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.unsubscribe();
  }

}
