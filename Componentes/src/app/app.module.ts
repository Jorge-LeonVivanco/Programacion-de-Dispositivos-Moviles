// src/app/app.module.ts
import { NgModule, isDevMode }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { RouteReuseStrategy }       from '@angular/router';
import { HttpClientModule }         from '@angular/common/http';  // ← importa el módulo, no el servicio
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { ModalInfoPageModule } from './pages/modal-info/modal-info.module'
import { AppComponent }   from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,    // ← agrégalo aquí
    ModalInfoPageModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})     // ← aquí
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
