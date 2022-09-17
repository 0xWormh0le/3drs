import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerHomePageRoutingModule } from './manager-home-routing.module';

import { ManagerHomePage } from './manager-home.page';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    ManagerHomePageRoutingModule,
    GooglePlaceModule
  ],
  declarations: [ManagerHomePage]
})
export class ManagerHomePageModule {}
