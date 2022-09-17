import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { RenterState } from './state/renter/renter.state';
import { AuthState } from './state/auth/auth.state';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { TabsPageModule } from './tabs/tabs.module';
import { PropertyState } from './state/property/property.state';
import { ManagerState } from './state/manager/manager.state';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MapState } from './state/map/map.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    NgxsStoragePluginModule.forRoot(),
    GooglePlaceModule,
    TabsPageModule,
    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsModule.forRoot([
      RenterState,
      AuthState,
      PropertyState,
      ManagerState,
      MapState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBHMBnKJKZFwikK4_WwbmCg3Ywa0DSfxqc'
    }),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyA0nfMwNy76ysz66sap0dNTLLX09ra3o1k',
      authDomain: 'threedroomspace.firebaseapp.com',
      projectId: 'threedroomspace',
      storageBucket: 'threedroomspace.appspot.com',
    }),
    AngularFireStorageModule,
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
