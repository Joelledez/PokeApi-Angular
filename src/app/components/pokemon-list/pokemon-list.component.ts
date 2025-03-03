import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon-service';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Pokemon } from '../../interfaces/pokemon-interface';
import { CrudService } from '../../services/crud.service';
import { forkJoin } from 'rxjs';

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

  constructor(
    @Inject(CrudService) private crudService: CrudService,
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
    
    forkJoin([
      this.crudService.getPokemons(),
      this.pokemonService.getPokemons(searchTerm)
    ]).subscribe(
      ([crudPokemons, apiPokemons]) => {
        const combinedPokemons = [...crudPokemons, ...apiPokemons];
        this.pokemons = combinedPokemons.filter(pokemon =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      },
      error => {
        console.error('Error al buscar Pokémon:', error);
      }
    );
  }

  onSearchSubmit(): void {
    this.fetchPokemons();
  }

  pokemonSelect(name: string): void {
    this.router.navigate(['/pokemon', name]);
  }
}
