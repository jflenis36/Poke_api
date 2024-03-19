import { Component, Input } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.css']
})
export class TargetsComponent {
  @Input() pokemon: string = '';
  specific_pokemon: any;
  id_pokemon: any;
  view_specific_pokemon: boolean = false;
  show_pokemon: boolean = false;

  ngOnInit() {
    return this.poke_api.getSpecificPokemon( "https://pokeapi.co/api/v2/pokemon/" + this.pokemon ).subscribe( data => {
      this.view_specific_pokemon = true
      this.id_pokemon = data.id;
      this.specific_pokemon = {
        name: data.name,
        img: data.sprites.front_default
      }
    });
  }

  constructor( private poke_api: PokemonService ) { }
}
