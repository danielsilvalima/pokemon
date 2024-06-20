import { Component } from '@angular/core';
import { Pokemon } from '../models/PokemonModel';
import { Observable, catchError, map, of } from 'rxjs';
import { PokemonService } from '../services/pokemon/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listPokemons: Pokemon[] = [];
  inputValue: string = '';

  constructor(private pokemonService: PokemonService) {}

  handleClick(){
    this.pokemonService.findByName(this.inputValue.toLowerCase()).pipe(
      map((result: Pokemon) => {
        const transformedResult: Pokemon = {
          id: result.id,
          name: result.name,
          height: result.height,
          weight: result.weight,
          types: result.types,
          sprites: result.sprites,
          base_experience: result.base_experience,
        };

        return [transformedResult];
      }),
      catchError((e) => {
        console.error('Error finding Pokémon:', e);
        return of([]);
      })
    ).subscribe((pokemons: Pokemon[]) => {
      this.listPokemons = pokemons;
    });
  }

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
  }

}
