import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from '../../interfaces/pokemon-interface';
import { CrudService } from '../../services/crud.service'; // ✅ Importar el nuevo servicio

@Component({
  selector: 'app-crud',
  standalone: false,
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent implements OnInit {
  pokemons: Pokemon[] = [];
  pokemonForm: FormGroup;
  editMode = false;
  editingPokemonIndex: number | null = null;

  constructor(private fb: FormBuilder, private db: CrudService) {
    this.pokemonForm = this.fb.group({
      name: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      abilities: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.pokemons = await this.db.getPokemons(); // Cargar Pokémon desde IndexedDB
  }

  async addPokemon() {
    if (this.pokemonForm.invalid) return;

    const newPokemon: Pokemon = {
      name: this.pokemonForm.value.name,
      height: this.pokemonForm.value.height*100,
      weight: this.pokemonForm.value.weight/10,
      abilities: this.pokemonForm.value.abilities.split(','),
      image: this.pokemonForm.value.image,
      description: this.pokemonForm.value.description
    };

    await this.db.savePokemon(newPokemon); // Guardar en IndexedDB
    this.pokemons = await this.db.getPokemons(); // Recargar lista
    this.pokemonForm.reset();
  }

  editPokemon(index: number) {
    this.editMode = true;
    this.editingPokemonIndex = index;
    const pokemon = this.pokemons[index];

    this.pokemonForm.patchValue({
      name: pokemon.name,
      height: pokemon.height/10,
      weight: pokemon.weight/10,
      abilities: pokemon.abilities.join(','),
      image: pokemon.image,
      description: pokemon.description
    });
  }

  async updatePokemon() {
    if (this.pokemonForm.invalid || this.editingPokemonIndex === null) return;

    const updatedPokemon: Pokemon = {
      name: this.pokemonForm.value.name,
      height: this.pokemonForm.value.height*10,
      weight: this.pokemonForm.value.weight*10,
      abilities: this.pokemonForm.value.abilities.split(','),
      image: this.pokemonForm.value.image,
      description: this.pokemonForm.value.description
    };

    await this.db.updatePokemon(this.pokemons[this.editingPokemonIndex].name, updatedPokemon);
    this.pokemons = await this.db.getPokemons();
    this.cancelEdit();
  }

  async deletePokemon(index: number) {
    await this.db.deletePokemon(this.pokemons[index].name);
    this.pokemons = await this.db.getPokemons();
  }

  cancelEdit() {
    this.editMode = false;
    this.editingPokemonIndex = null;
    this.pokemonForm.reset();
  }
}