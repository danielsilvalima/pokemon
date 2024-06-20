

import { Injectable } from '@angular/core';
import { Pokemon } from '../../models/PokemonModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//const config = require('../../config/api.json');

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private API = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private httpClient: HttpClient) { }

  list():Observable<any>{
    return this.httpClient.get<Pokemon>(this.API);
  }

  findByName(name: string): Observable<any> {
    return this.httpClient.get(`${this.API}/${name}`);
  }
}
