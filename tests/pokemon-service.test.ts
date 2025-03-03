import { describe, it, expect, vi, beforeEach } from "vitest";
import { PokemonService } from "../src/app/services/pokemon-service";
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

let pokemonService: PokemonService;
let httpClientMock: Partial<HttpClient>;

beforeEach(() => {
  httpClientMock = {
    get: vi.fn(),
  };

  pokemonService = new PokemonService(httpClientMock as HttpClient);
});

describe("getPokemons", () => {
    it("should return an array of pokemons", async () => {
      /// Arrange
      const mockPokemons = [
        { name: "Pikachu", url: "https://pokeapi.co/api/v2/pokemon/25" },
        { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4" }
      ];

      // Mock the HTTP GET response
      (httpClientMock.get as any).mockReturnValue(of({ results: mockPokemons }));

      /// Act
      const result = await pokemonService.getPokemons("pika").toPromise();

      /// Assert
      expect(result).toBeInstanceOf(Array);
    });
});

// 🔵 Test para getPokemonDetails()
describe('getPokemonDetails', () => {
  it('should return the details of a pokemon', async () => {
    /// Arrange
    const mockPokemon = { name: 'Pikachu', height: 40, weight: 6 };

    // Mock de la respuesta HTTP
    vi.spyOn(httpClientMock as HttpClient, 'get').mockReturnValue(of(mockPokemon));

    /// Act
    const result = await pokemonService.getPokemonDetails('pikachu').toPromise();

    /// Assert
    expect(result).toBeDefined();
    expect(result.name).toBe('Pikachu');
    expect(httpClientMock.get).toHaveBeenCalled();
  });
});