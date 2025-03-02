import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon-service';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Pokemon } from '../../interfaces/pokemon-interface';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  standalone: false,
})

export class PokemonListComponent implements OnInit {
  title = 'Pokedex';
  pokemons: Pokemon[] = [];
  searchForm!: FormGroup; 

  pokemonSelect(name: string): void { 
    this.router.navigate(['/pokemon', name]);
  }
  
  constructor(
    @Inject(PokemonService) private pokemonService: PokemonService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchValue: ['']
    });
    this.fetchPokemons();  
  }

  fetchPokemons(): void {
    const searchTerm = this.searchForm.get('searchValue')?.value || '';  
    this.pokemonService.getPokemons(searchTerm).subscribe(
      (pokemons) => {
        this.pokemons = pokemons;
      },
      (error) => {
        console.error('Error al buscar Pokémon:', error);
      }
    );
  }

  onSearchSubmit(): void {
    this.fetchPokemons();  
  }
}