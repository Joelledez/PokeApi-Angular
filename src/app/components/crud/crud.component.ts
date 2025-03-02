import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from '../../interfaces/pokemon-interface';

@Component({
  selector: 'app-crud',
  standalone: false,
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {
  pokemons: Pokemon[] = [];
  pokemonForm: FormGroup;
  editMode: boolean = false;
  editingPokemonIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.pokemonForm = this.fb.group({
      name: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      abilities: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInitialPokemons();
  }

  loadInitialPokemons(): void {
    this.pokemons = [
      {
        name: 'Pikachu',
        height: 40,
        weight: 6,
        abilities: ['Static', 'Lightning Rod'],
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        description: 'Pikachu almacena electricidad en sus mejillas y la libera en combate.'
      },
      {
        name: 'Charmander',
        height: 60,
        weight: 8.5,
        abilities: ['Blaze', 'Solar Power'],
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
        description: 'Charmander tiene una llama en la cola que refleja su salud y estado emocional.'
      }
    ];
  }

  addPokemon(): void {
    if (this.pokemonForm.invalid) return;

    const newPokemon: Pokemon = {
      name: this.pokemonForm.value.name,
      height: this.pokemonForm.value.height,
      weight: this.pokemonForm.value.weight,
      abilities: this.pokemonForm.value.abilities.split(','),
      image: this.pokemonForm.value.image,
      description: this.pokemonForm.value.description
    };

    this.pokemons.push(newPokemon);
    this.pokemonForm.reset();
  }

  editPokemon(index: number): void {
    this.editMode = true;
    this.editingPokemonIndex = index;
    const pokemon = this.pokemons[index];
    this.pokemonForm.patchValue({
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: pokemon.abilities.join(','),
      image: pokemon.image,
      description: pokemon.description
    });
  }

  updatePokemon(): void {
    if (this.pokemonForm.invalid || this.editingPokemonIndex === null) return;

    this.pokemons[this.editingPokemonIndex] = {
      name: this.pokemonForm.value.name,
      height: this.pokemonForm.value.height,
      weight: this.pokemonForm.value.weight,
      abilities: this.pokemonForm.value.abilities.split(','),
      image: this.pokemonForm.value.image,
      description: this.pokemonForm.value.description
    };

    this.cancelEdit();
  }

  deletePokemon(index: number): void {
    this.pokemons.splice(index, 1);
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editingPokemonIndex = null;
    this.pokemonForm.reset();
  }
}
