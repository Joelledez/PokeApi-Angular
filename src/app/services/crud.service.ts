import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Pokemon } from '../interfaces/pokemon-interface';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private pokemons!: Dexie.Table<Pokemon, string>; // Tabla de Pokémon

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Solo inicializa Dexie si está en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const db = new Dexie('PokemonDB'); // Nombre de la base de datos
      db.version(1).stores({
        pokemons: 'name' // Indexa por nombre
      });
      this.pokemons = db.table('pokemons');
    }
  }

  // Guardar Pokémon
  async savePokemon(pokemon: Pokemon) {
    console.log(pokemon);
    if (!this.pokemons) return; // Evita errores en SSR
    await this.pokemons.put(pokemon);
  }

  // Obtener todos los Pokémon
  async getPokemons(): Promise<Pokemon[]> {
    if (!this.pokemons) return []; // Evita errores en SSR
    return await this.pokemons.toArray();
  }

  // Eliminar un Pokémon por nombre
  async deletePokemon(name: string) {
    if (!this.pokemons) return; // Evita errores en SSR
    await this.pokemons.delete(name);
  }

  // Actualizar un Pokémon
  async updatePokemon(name: string, updatedData: Partial<Pokemon>) {
    if (!this.pokemons) return; // Evita errores en SSR
    await this.pokemons.update(name, updatedData);
  }

  async getPokemonByName(name: string): Promise<Pokemon | null> {
    return await this.pokemons.get(name) || null;
  }
}

