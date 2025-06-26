import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DateTimePageRoutingModule } from './date-time-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DateTimePage }              from './date-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateTimePageRoutingModule,
    ComponentsModule,
    FormsModule,     // si usaras ngModel o formControlName
    IonicModule,     // ¡aquí viene ion-datetime!
  ],
  declarations: [DateTimePage]
})
export class DateTimePageModule {}
