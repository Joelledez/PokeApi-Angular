import { describe, test, it, expect } from "vitest";
import { CrudService } from "../src/app/services/crud.service";
import { Pokemon } from "../src/app/interfaces/pokemon-interface";

describe('savePokemon',()=>{
    it('should save the pokemon on the IndexedDB', async () =>{
        ///AAA
        ///Arrange
        let pokemon: Pokemon
        pokemon = {
            name: "Pikachu",
            description: "Pikachu is an Electric type Pokémon introduced in Generation 1. It is known as the Mouse Pokémon.",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            weight: 60,
            height: 4,
            abilities: ["Static", "Lightning Rod"],
            };
            
        ///Act
        const crudService = new CrudService(pokemon);
        const result = await crudService.savePokemon(pokemon);
        ///Assert
        expect(result).toBeUndefined();
    });
});

describe('getPokemons',()=>{
    it('should return an array of pokemons', async () =>{
        ///AAA
        ///Arrange
        let pokemon: Pokemon
        pokemon = {
            name: "Pikachu",
            description: "Pikachu is an Electric type Pokémon introduced in Generation 1. It is known as the Mouse Pokémon.",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            weight: 60,
            height: 4,
            abilities: ["Static", "Lightning Rod"],
            };  
        ///Act
        const crudService = new CrudService(pokemon);
        const result = await crudService.getPokemons();
        ///Assert
        expect(result).toBeInstanceOf(Array);
    });
});

describe('updatePokemon',()=>{
    it('should update the pokemon on the IndexedDB', async () =>{
        ///AAA
        ///Arrange
        let pokemon: Pokemon
        pokemon = {
            name: "Pikachu",
            description: "Pikachu is an Electric type Pokémon introduced in Generation 1. It is known as the Mouse Pokémon.",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            weight: 60,
            height: 4,
            abilities: ["Static", "Lightning Rod"],
            };  
        ///Act
        const crudService = new CrudService(pokemon);
        const result = await crudService.updatePokemon(pokemon.name, pokemon);
        ///Assert
        expect(result).toBeUndefined();
    });
});

describe('deletePokemon',()=>{
    it('should delete a pokemon from the IndexedDB', async () =>{
        ///AAA
        ///Arrange
        let pokemon: Pokemon
        pokemon = {
            name: "Pikachu",
            description: "Pikachu is an Electric type Pokémon introduced in Generation 1. It is known as the Mouse Pokémon.",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            weight: 60,
            height: 4,
            abilities: ["Static", "Lightning Rod"],
            };  
        ///Act
        const crudService = new CrudService(pokemon);
        const result = await crudService.deletePokemon(pokemon.name);
        ///Assert
        expect(result).toBeUndefined();
    });
});

describe('getPokemonByName',()=>{
    it('should return a pokemon by name', async () =>{
        ///AAA
        ///Arrange
        const pokemonName = "Cristiano Ronaldo";
        let pokemon: Pokemon
        pokemon = {
            name: "Pikachu",
            description: "Pikachu is an Electric type Pokémon introduced in Generation 1. It is known as the Mouse Pokémon.",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            weight: 60,
            height: 4,
            abilities: ["Static", "Lightning Rod"],
            };  
        ///Act
        const crudService = new CrudService(pokemon);
        const result = await crudService.getPokemonByName(pokemonName);
        ///Assert
        expect(result).toBeInstanceOf(Object);
    });
});