import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service'; 

@Component({
  selector: 'app-view-pokemon',
  templateUrl: './view-pokemon.component.html',
  styleUrls: ['./view-pokemon.component.css']
})
export class ViewPokemonComponent {

  pokemon: any;
  state_find_pokemon: boolean = false;
  id_pokemon: any = '';

  constructor (private route: ActivatedRoute, private poke_api: PokemonService ) { }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('pokemon');
    if(!isNaN(Number(name))) {
      this.id_pokemon = parseInt(name ?? " ");
      this.poke_api.getSpecificPokemon("https://pokeapi.co/api/v2/pokemon/" + this.id_pokemon ).subscribe(data =>  {
        this.pokemon = data;
        this.state_find_pokemon = true;
      });
    }
  }

  getNameUpper() {
    return this.pokemon.name.toUpperCase();
  }

  previousPokemon() {
    if(this.id_pokemon > 1) {
      this.state_find_pokemon = false;
      this.id_pokemon --;
      this.poke_api.getSpecificPokemon("https://pokeapi.co/api/v2/pokemon/" + this.id_pokemon ).subscribe(data =>  {
        this.pokemon = data;
        this.state_find_pokemon = true;
      });
    }
  }

  nextPokemon() {
    this.state_find_pokemon = false;
    this.id_pokemon ++;
    if(this.id_pokemon < 1025) {
      this.poke_api.getSpecificPokemon("https://pokeapi.co/api/v2/pokemon/" + this.id_pokemon ).subscribe(data =>  {
        this.pokemon = data;
        this.state_find_pokemon = true;
      });
    }
  }
}
