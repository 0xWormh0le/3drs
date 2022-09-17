import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerCalendarPageRoutingModule } from './manager-calendar-routing.module';

import { ManagerCalendarPage } from './manager-calendar.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerCalendarPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [ManagerCalendarPage]
})
export class ManagerCalendarPageModule {}
