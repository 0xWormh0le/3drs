import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'map',
        loadChildren: () => import('./../pages/map/map.module').then( m => m.MapPageModule)
      },
      {
        path: 'my-profile',
        loadChildren: () => import('./../pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('./../pages/messages/messages.module').then( m => m.MessagesPageModule)
      },
      {
        path: 'listing-detail',
        loadChildren: () => import('./../pages/listing-detail/listing-detail.module').then( m => m.ListingDetailPageModule)
      },
      {
        path: 'manager-home',
        loadChildren: () => import('./../pages/manager-home/manager-home.module').then( m => m.ManagerHomePageModule)
      },
      {
        path: 'manager-calendar',
        loadChildren: () => import('./../pages/manager-calendar/manager-calendar.module').then( m => m.ManagerCalendarPageModule)
      },
      {
        path: 'manager-messages',
        loadChildren: () => import('./../pages/manager-messages/manager-messages.module').then( m => m.ManagerMessagesPageModule)
      },
      {
        path: 'manager-profile',
        loadChildren: () => import('./../pages/manager-profile/manager-profile.module').then( m => m.ManagerProfilePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
