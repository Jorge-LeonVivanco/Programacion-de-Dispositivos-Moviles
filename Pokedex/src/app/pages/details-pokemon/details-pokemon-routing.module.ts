import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsPokemonPage } from './details-pokemon.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsPokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsPokemonPageRoutingModule {}
