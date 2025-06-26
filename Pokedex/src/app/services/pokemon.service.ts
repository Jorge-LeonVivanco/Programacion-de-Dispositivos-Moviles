import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { IPokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly URL_BASE = 'https://pokeapi.co/api/v2/pokemon';
  private nextUrl = `${this.URL_BASE}?limit=20&offset=0`

  getPokemons(){

    // Comprobamos si hay una siguiente url
    if(this.nextUrl){

      
      const options = {
        url: this.nextUrl,
        params: {}
      }

      // Hacemos una peticion
      return CapacitorHttp.get(options).then( async (response: HttpResponse) => {

        console.log(response);
        const pokemons: IPokemon[] = [];
        
        // Datos de la respuesta
        if(response.data){

          // Resultados
          const results = response.data.results;
          // Actualizamos la URL siguiente
          this.nextUrl = response.data.next;

          // Guardamos todas las promesas de las pokemons
          const promises: Promise<HttpResponse>[] = [];

          // Obtenemos cada una de las promesas
          for (const result of results) {
            const urlPokemon = result.url;
            const optionsPokemon = {
              url: urlPokemon,
              params: {}
            }
            promises.push(CapacitorHttp.get(optionsPokemon))
          }

          // Ejecutamos y procesamos todas las promesas
          await Promise.all(promises).then( (responses: HttpResponse[]) => {

            console.log(responses);
            for (const response of responses) {
              // Procesamos un pokemon
              const pokemon = this.processPokemon(response.data);
              pokemons.push(pokemon);
            }
            

          })

        }

        return pokemons;

      })

    }
    return null;
  }

  /**
   * Obtenemos un pokemon
   * @param id 
   * @returns 
   */
  getPokemon(id: number){
    const options = {
      url: `${this.URL_BASE}/${id}`,
      params: {}
    }
    // Hacemos una peticion
    return CapacitorHttp.get(options).then( (response: HttpResponse) => this.processPokemon(response.data))
  }

  /**
   * Procesa los datos de la PokeApi a un nuestro modelo Pokemon
   * @param pokemonData 
   * @returns 
   */
  private processPokemon(pokemonData: any){

    // Creo el modelo de pokemon
    const pokemon: IPokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      type1: pokemonData.types[0].type.name,
      sprite: pokemonData.sprites.front_default,
      weight: pokemonData.weight / 10,
      height: pokemonData.height / 10,
      stats: pokemonData.stats.map( (stat: any) => {
        return {
          base_stat: stat.base_stat,
          name: stat.stat.name
        }
      }),
      abilities: pokemonData.abilities
        .filter( (ability: any) => !ability.is_hidden)
        .map( (ability: any) => ability.ability.name)
    }

    // 2º tipo
    if(pokemonData.types[1]){
      pokemon.type2 = pokemonData.types[1].type.name
    }

    // habilidad oculta
    const hiddenAbility = pokemonData.abilities.find( (ability: any) => ability.is_hidden)

    if(hiddenAbility){
      pokemon.hiddenAbility = hiddenAbility.ability.name;
    }
    
    return pokemon;

  }

}
