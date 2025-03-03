import { describe, test, it, expect } from "vitest";
import { ChatGptService } from "../src/app/services/chatgpt.service";

describe('getPokemonDescription',()=>{
    it('should return a description of a pokemon',() =>{
        ///AAA
        ///Arrange
        const pokemonName = "Pikachu";
        ///Act
        const chatgptService = new ChatGptService();
        const result = chatgptService.getPokemonDescription(pokemonName);
        ///Assert
        expect(result).toBeDefined();
    });
});