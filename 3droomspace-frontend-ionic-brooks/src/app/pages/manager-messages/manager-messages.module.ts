import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerMessagesPageRoutingModule } from './manager-messages-routing.module';

import { ManagerMessagesPage } from './manager-messages.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerMessagesPageRoutingModule
  ],
  declarations: [ManagerMessagesPage]
})
export class ManagerMessagesPageModule {}
