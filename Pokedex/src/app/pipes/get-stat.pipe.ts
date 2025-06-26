import { Pipe, PipeTransform } from '@angular/core';
import { IPokemon } from '../models/pokemon.model';
import { IStat } from '../models/stat.model';

@Pipe({
  name: 'getStat',
  standalone: true
})
export class GetStatPipe implements PipeTransform {

  transform(pokemon: IPokemon, nameStat: string): number {
    // Busco el stat
    const statFound = pokemon.stats.find( (stat: IStat) => stat.name == nameStat );
    // si existe, obtengo el base_stat
    if(statFound){
      return statFound.base_stat;
    }
    return 0;
  }

}
