import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerCalendarPage } from './manager-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerCalendarPageRoutingModule {}
