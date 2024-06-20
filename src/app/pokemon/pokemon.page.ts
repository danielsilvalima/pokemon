import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/PokemonModel';
import { catchError, map, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
  pokemons!: Pokemon[]

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getPokemonDetails(id);
  }

  getPokemonDetails(name:any|string){
    this.pokemonService.findByName(name.toLowerCase()).pipe(
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
      this.pokemons = pokemons;
    });
  }

}
