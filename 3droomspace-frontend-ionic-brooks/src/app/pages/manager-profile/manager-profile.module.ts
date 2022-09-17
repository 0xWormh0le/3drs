import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerProfilePageRoutingModule } from './manager-profile-routing.module';

import { ManagerProfilePage } from './manager-profile.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerProfilePageRoutingModule
  ],
  declarations: [ManagerProfilePage]
})
export class ManagerProfilePageModule {}
