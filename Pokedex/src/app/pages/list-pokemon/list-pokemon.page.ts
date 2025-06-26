import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent, 
  LoadingController,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent
} from '@ionic/angular/standalone';
import { IPokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.page.html',
  styleUrls: ['./list-pokemon.page.scss'],
  standalone:false
})
export class ListPokemonPage {

  private pokemonService: PokemonService = inject(PokemonService);
  private loadingController: LoadingController = inject(LoadingController);
  private router = inject(Router)

  // pokemons a mostrar
  public pokemons: IPokemon[] = [];
  
  ionViewWillEnter() {
    this.morePokemon();
  }

  /**
   * Pedimos y recogemos mas pokemons
   * @param event Evento de scroll
   */
  async morePokemon(event?: InfiniteScrollCustomEvent){

    // Obtengo la promesa
    const promisePokemons = this.pokemonService.getPokemons();

    // si hay mas pokemons, ejecuto la promesa
    if(promisePokemons){

      let loading: any;
      if(!event){
        // Muestro el mensaje de carga
        loading = await this.loadingController.create({
          message: 'Cargando...'
        });
        loading.present();
      }
    
      promisePokemons.then( (pokemons: IPokemon[]) => {
        console.log(pokemons);
        this.pokemons = this.pokemons.concat(pokemons);
      }).catch(error => {
        console.error(error);
      }).finally(() => {
        // Cerramos el mensaje de carga y completamos el scroll
        loading?.dismiss();
        event?.target.complete();
      })

    }else{
      event?.target.complete();
    }

  }

  /**
   * Vamos al detalle del pokemon
   * @param pokemon 
   */
  goToDetail(pokemon: IPokemon){
    this.router.navigate(['details-pokemon', pokemon.id])
  }

}
