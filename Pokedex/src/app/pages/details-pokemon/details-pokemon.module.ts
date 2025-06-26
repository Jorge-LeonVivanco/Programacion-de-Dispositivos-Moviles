import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailsPokemonPageRoutingModule } from './details-pokemon-routing.module';
import { DetailsPokemonPage } from './details-pokemon.page';
import { GetStatPipe } from "../../pipes/get-stat.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPokemonPageRoutingModule,
    GetStatPipe
],
  declarations: [DetailsPokemonPage]
})
export class DetailsPokemonPageModule {}
