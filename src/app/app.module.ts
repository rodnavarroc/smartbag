import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { firebaseConfig } from "../environments/environment";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule],
  providers: [
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FingerprintAIO,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
