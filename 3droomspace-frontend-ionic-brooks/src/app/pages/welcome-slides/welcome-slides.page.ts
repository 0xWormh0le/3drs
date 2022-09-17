import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserModel } from 'src/app/state/renter/renter-info.model';
import { Store, Select } from '@ngxs/store';
import { RenterState } from 'src/app/state/renter/renter.state';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WelcomeFormSubmitted } from 'src/app/state/renter/renter.actions';
import { Navigate } from '@ngxs/router-plugin';
import { IonSlides } from '@ionic/angular';
import { AgmGeocoder } from '@agm/core';
import { MapStateModel, Coords } from 'src/app/state/map/map.state.model';
import { SetMapLocation } from 'src/app/state/map/map.action';

@Component({
  selector: 'app-welcome-slides',
  templateUrl: './welcome-slides.page.html',
  styleUrls: ['./welcome-slides.page.scss'],
})
export class WelcomeSlidesPage implements OnInit, OnDestroy {
  @Select(RenterState.userInfo) userInfo$: Observable<UserModel>;
  @ViewChild(IonSlides) ionSlides: IonSlides;

  public userInfo: UserModel;
  public ngDestroyed$ = new Subject();
  public welcomeForm: FormGroup;
  public min = 0;
  public max = 0;
  public showBackButton = false;
  public mapLocation: Coords;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.getUserInfo();
    this.generateForm();

  }

  ionViewDidEnter() {
    this.ionSlides.lockSwipes(true);
  }

  handleAddressChange(event) {
    this.mapLocation = {
      latitude: event.geometry.location.lat(),
      longitude: event.geometry.location.lng()
    };
    this.welcomeForm.patchValue({ location: event.formatted_address });
  }

  ngOnInit() {
    this.welcomeForm.valueChanges
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(data => {
        this.min = data.desiredPrice.lower;
        this.max = data.desiredPrice.upper;
      });
  }



  nextSlide() {
    this.ionSlides.lockSwipes(false);
    this.ionSlides.slideNext();
    this.ionSlides.lockSwipes(true);
    this.setShowBackButton();
  }

  setShowBackButton() {
    this.ionSlides.getActiveIndex().then(index => {
      if (index > 0) {
        this.showBackButton = true;
      } else {
        this.showBackButton = false;
      }
    })
  }

  backSlide() {
    this.ionSlides.lockSwipes(false);
    this.ionSlides.slidePrev();
    this.ionSlides.lockSwipes(true);
    this.setShowBackButton();
  }

  generateForm() {
    this.welcomeForm = this.fb.group({
      location: ['', [Validators.required]],
      desiredPrice: ['', [Validators.required]],
      shared: ['', []],
      private: ['', []]
    });
  }

  getUserInfo() {
    this.userInfo$
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(userInfo => {
        this.userInfo = userInfo;
      });
  }

  onSubmit() {
    this.store.dispatch(new WelcomeFormSubmitted())
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(data => {
        // this.store.dispatch(new SetMapLocation({
        //   latitude: this.mapLocation.centerCoordinates.latitude,
        //   longitude: this.mapLocation.centerCoordinates.latitude
        // }));
        this.navigateToMap();
        // this.welcomeForm.reset();
      });
  }

  navigateToMap() {
    this.store.dispatch(new Navigate(['/tabs/map']));
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.unsubscribe();
  }

}
