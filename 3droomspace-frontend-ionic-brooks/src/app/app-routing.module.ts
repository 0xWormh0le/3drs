import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'welcome-slides',
    loadChildren: () => import('./pages/welcome-slides/welcome-slides.module').then( m => m.WelcomeSlidesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'listing-detail',
    loadChildren: () => import('./pages/listing-detail/listing-detail.module').then( m => m.ListingDetailPageModule)
  },
  {
    path: 'manager-calendar',
    loadChildren: () => import('./pages/manager-calendar/manager-calendar.module').then( m => m.ManagerCalendarPageModule)
  },
  {
    path: 'manager-profile',
    loadChildren: () => import('./pages/manager-profile/manager-profile.module').then( m => m.ManagerProfilePageModule)
  },
  {
    path: 'manager-messages',
    loadChildren: () => import('./pages/manager-messages/manager-messages.module').then( m => m.ManagerMessagesPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
