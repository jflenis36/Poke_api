import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url : string = 'https://pokeapi.co/api/v2/';
  
  constructor(private http: HttpClient) { }

  getGenerlaInfo() {
    return this.http.get<any>( this.url );
  }

  getAllPokemons (url: string) {
    return this.http.get<any>( url );
  }

  getSpecificPokemon(url: string) {
    return this.http.get<any>( url );
  }
  
  PokemonsForType(type: string) {
    return this.http.get<any>( this.url + type );
  }
}
