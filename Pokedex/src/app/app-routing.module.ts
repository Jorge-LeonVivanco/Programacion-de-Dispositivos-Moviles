import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-pokemon',
    pathMatch: 'full'
  },
  {
    path: 'list-pokemon',
    loadChildren: () => import('./pages/list-pokemon/list-pokemon.module').then( m => m.ListPokemonPageModule)
  },
  {
    path: 'details-pokemon/:id',
    loadChildren: () => import('./pages/details-pokemon/details-pokemon.module').then( m => m.DetailsPokemonPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
