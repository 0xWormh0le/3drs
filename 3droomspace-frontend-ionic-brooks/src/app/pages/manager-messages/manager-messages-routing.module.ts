import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerMessagesPage } from './manager-messages.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerMessagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerMessagesPageRoutingModule {}
