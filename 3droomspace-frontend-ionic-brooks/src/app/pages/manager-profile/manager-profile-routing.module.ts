import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerProfilePage } from './manager-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerProfilePageRoutingModule {}
