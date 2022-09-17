import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerHomePage } from './manager-home.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerHomePageRoutingModule {}
