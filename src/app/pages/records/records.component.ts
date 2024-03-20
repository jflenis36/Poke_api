import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent {

  pokemons: any = [];
  pokemons_filters: any = [];
  total_pokemons_filters: any = [];
  index_filters: number = 0;
  max_page_filters: number = 0;
  status_filter: boolean = false;
  type_filters: any = [];
  state_type_filters: boolean = false;
  state_type: boolean = false;
  types_pokemons: any = [];
  form_filter!: FormGroup;
  current_pages: any = {
    page: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10',
    next: '',
    previous: null
  };
  specific_pokemon: any;
  view_specific_pokemon: boolean = false;

  constructor(private poke_api: PokemonService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form_filter = this.fb.group({
      type_filter: null,
      type: null
    });
    this.poke_api.getAllPokemons(this.current_pages.page).subscribe(data => {
      this.pokemons = data.results;
      this.current_pages.next = data.next
      this.current_pages.previous = data.previous
    });
  }

  nextPage() {
    this.poke_api.getAllPokemons(this.current_pages.next).subscribe(data => {
      if(data.next != 'https://pokeapi.co/api/v2/pokemon?offset=1300&limit=2') {
        this.current_pages.previous = data.previous
        this.current_pages.next = data.next
      } else {
        this.current_pages.next = "https://pokeapi.co/api/v2/pokemon?offset=1300&limit=10"
        this.current_pages.previous = this.current_pages.page
      }
      this.pokemons = data.results;
    });
  }

  previousPage() {
    this.poke_api.getAllPokemons(this.current_pages.previous).subscribe(data => {
      if(data.next == 'https://pokeapi.co/api/v2/pokemon?offset=1300&limit=2') {
        this.current_pages.next = "https://pokeapi.co/api/v2/pokemon?offset=1300&limit=10"
      } else {
        this.current_pages.next = data.next
      }
      this.current_pages.previous = data.previous
      this.pokemons = data.results;
    });
  }

  getSpecificPokemon(pokemon: any) {
    return this.poke_api.getSpecificPokemon( "https://pokeapi.co/api/v2/pokemon/" + pokemon.name ).subscribe( data => {
      this.view_specific_pokemon = true
      this.specific_pokemon = {
        name: data.name,
        img: data.sprites.front_default
      }
    });
  }

  search_filters() {
    this.changeSubtype();
    if(this.form_filter.value.type != null || this.form_filter.value.type == '') {
      this.poke_api.getAllPokemons(this.form_filter.value.type).subscribe(data => {
        this.total_pokemons_filters = data;
        this.orginizeDataFilter(data, this.form_filter.value.type_filter, this.index_filters)
      });
    } else {
      alert("Please complet fields both");
    }
  }

  changeTypeFilterInput() {
    this.form_filter.get('type')?.setValue(null);
    this.pokemons_filters = [];
    this.total_pokemons_filters = [];
    this.index_filters = 0;
    this.max_page_filters = 0;
    this.status_filter = false;
    if(this.form_filter.value.type_filter == null || this.form_filter.value.type_filter == 'null' ) {
      alert("Please select type filter");
      this.state_type_filters = false;
      this.poke_api.getAllPokemons(this.current_pages.page).subscribe(data => {
        this.pokemons = data.results;
        this.current_pages.next = data.next
        this.current_pages.previous = data.previous
      });
    } else {
      this.poke_api.PokemonsForType(this.form_filter.value.type_filter).subscribe(data => {
        this.state_type_filters = true;
        this.types_pokemons = data.results;
      });
    }
  }

  orginizeDataFilter(data: any, type: string, index: any) {
    this.status_filter = true;
    let new_data = [];
    switch (type) {
      case 'type':
        this.max_page_filters = Math.ceil(this.total_pokemons_filters.pokemon.length / 10);
        for (let i = 0 + 10 * index; i < 10 + 10 * index; i++) {
          new_data.push(data.pokemon[i].pokemon);
        }
        this.pokemons_filters = new_data;
        break;
      case 'gender':
        this.max_page_filters = Math.ceil(this.total_pokemons_filters.pokemon_species_details.length / 10);
        for (let i = 0 + 10 * index; i < 10 + 10 * index; i++) {
          new_data.push(data.pokemon_species_details[i].pokemon_species);
        }
        this.pokemons_filters = new_data;
        break;
      case 'pokemon-color':
        this.max_page_filters = Math.ceil(this.total_pokemons_filters.pokemon_species.length / 10);
        for (let i = 0 + 10 * index; i < 10 + 10 * index; i++) {
          new_data.push(data.pokemon_species[i]);
        }
        this.pokemons_filters = new_data;
        break;
      case 'generation':
        this.max_page_filters = Math.ceil(this.total_pokemons_filters.pokemon_species.length / 10);
        for (let i = 0 + 10 * index; i < 10 + 10 * index; i++) {
          new_data.push(data.pokemon_species[i]);
        }
        this.pokemons_filters = new_data;
        
        break;
    }
  }

  

  nextPage2() {
    if(this.index_filters < this.max_page_filters) {
      this.index_filters+=1;
      this.orginizeDataFilter(this.total_pokemons_filters, this.form_filter.value.type_filter, this.index_filters)
    }
  }
  
  previousPage2() {
    if(this.index_filters > 0) {
      this.index_filters-=1;
      this.orginizeDataFilter(this.total_pokemons_filters, this.form_filter.value.type_filter, this.index_filters)
    }
  }

  changeSubtype() {
    this.pokemons_filters = [];
    this.total_pokemons_filters = [];
    this.index_filters = 0;
    this.max_page_filters = 0;
  }
}
