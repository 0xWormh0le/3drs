import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { WelcomeSlidesPageRoutingModule } from './welcome-slides-routing.module';
import { WelcomeSlidesPage } from './welcome-slides.page';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomeSlidesPageRoutingModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    GooglePlaceModule
  ],
  declarations: [WelcomeSlidesPage]
})
export class WelcomeSlidesPageModule {}
