import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { IonicModule }          from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SlidesPageRoutingModule } from './slides-routing.module';
import { SlidesPage } from './slides.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,               
    SlidesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SlidesPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]  // ← aquí
})
export class SlidesPageModule {}
