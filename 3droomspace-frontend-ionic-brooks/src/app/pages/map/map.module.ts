import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import { MapComponent } from 'src/app/components/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { DatePopoverComponent } from 'src/app/components/date-popover/date-popover.component';
import { TypePopoverComponent } from 'src/app/components/type-popover/type-popover.component';
import { PricePopoverComponent } from 'src/app/components/price-popover/price-popover.component';
import { ListViewComponent } from 'src/app/components/list-view/list-view.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHMBnKJKZFwikK4_WwbmCg3Ywa0DSfxqc'
    })
  ],
  providers: [MapComponent, ListViewComponent],
  entryComponents: [DatePopoverComponent, TypePopoverComponent, PricePopoverComponent],
  declarations: [MapPage, MapComponent, ListViewComponent, DatePopoverComponent, TypePopoverComponent, PricePopoverComponent]
})
export class MapPageModule {}
