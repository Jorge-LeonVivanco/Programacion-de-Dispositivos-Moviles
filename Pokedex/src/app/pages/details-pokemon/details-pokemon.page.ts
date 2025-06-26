import { Component, inject } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IPokemon } from 'src/app/models/pokemon.model';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { Router, ActivatedRoute } from '@angular/router';  // Importamos ActivatedRoute

interface PokemonStat {
  name: string;
  stat: string;
}

@Component({
  selector: 'app-details-pokemon',
  templateUrl: './details-pokemon.page.html',
  styleUrls: ['./details-pokemon.page.scss'],
  standalone: false // Deja standalone: false
})
export class DetailsPokemonPage {
  private pokemonService: PokemonService = inject(PokemonService);
  private loadingController: LoadingController = inject(LoadingController);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);  // Inyectamos ActivatedRoute

  // Pokemon a mostrar
  public pokemon!: IPokemon;
  public pokemonStats: PokemonStat[] = [
    { name: 'PS', stat: 'hp' },
    { name: 'Ataque', stat: 'attack' },
    { name: 'Defensa', stat: 'defense' },
    { name: 'At. esp.', stat: 'special-attack' },
    { name: 'Def. esp.', stat: 'special-defense' },
    { name: 'Velocidad', stat: 'speed' }
  ];

  constructor() {
    addIcons({
      closeOutline
    });
  }

  async ionViewWillEnter() {
    // Obtenemos el id desde la URL usando ActivatedRoute
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      // Si no hay ID, redirigimos a la lista
      this.goBack();
      return;
    }

    // Convertimos el id a número
    const pokemonId = Number(id);  // Convertimos el id de string a number

    if (isNaN(pokemonId)) {
      console.error('El ID proporcionado no es un número válido');
      this.goBack();
      return;
    }

    // Mostramos mensaje de carga
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    loading.present();

    // Obtenemos el pokemon
    this.pokemonService.getPokemon(pokemonId).then((pokemon: IPokemon) => {
      this.pokemon = pokemon;
    }).catch((error) => {
      // En caso de fallo, muestra mensaje de error
      console.error('Error al cargar el Pokémon:', error);
      alert('Hubo un problema al cargar los detalles del Pokémon.');
      this.goBack();
    }).finally(() => {
      loading.dismiss();
    });
  }

  /**
   * Vuelve a list-pokemon
   */
  goBack() {
    this.router.navigateByUrl('list-pokemon');  // Asegúrate de que la ruta es la correcta
  }
}
