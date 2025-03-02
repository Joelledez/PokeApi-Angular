import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";

export interface PokemonInterface {
name: string;
}@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  private http = inject(HttpClient);

  getPokemons(searchTerm: string, limit: number = 5): Observable<any[]> {
    return this.http.get<{ results: { name: string; url: string; }[]; }>(`${this.apiUrl}?limit=1000`).pipe(
      map(response => {
        if (!response.results || response.results.length === 0) {
          return []; // ✅ Retorna un array vacío si no hay resultados
        }

        const pokemons = response.results;

        // ✅ Filtrar solo los Pokémon que contengan `searchTerm`
        const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // ✅ Si hay menos de `limit`, no es necesario ordenar más
        if (filteredPokemons.length <= limit) {
          return filteredPokemons.slice(0, limit);
        }

        // ✅ Función Levenshtein solo si hay más de `limit` resultados
        const levenshtein = (a: string, b: string): number => {
          const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0)
          );

          for (let i = 0; i <= a.length; i++) dp[i][0] = i;
          for (let j = 0; j <= b.length; j++) dp[0][j] = j;

          for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
              dp[i][j] =
                a[i - 1] === b[j - 1]
                  ? dp[i - 1][j - 1]
                  : Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
            }
          }
          return dp[a.length][b.length];
        };

        // ✅ Ordenar por similitud y devolver solo `limit` resultados
        const sortedPokemons = filteredPokemons
          .map(pokemon => ({
            ...pokemon,
            similarity: levenshtein(searchTerm.toLowerCase(), pokemon.name.toLowerCase())
          }))
          .sort((a, b) => a.similarity - b.similarity)
          .slice(0, limit);

        return sortedPokemons.map(pokemon => ({
          name: pokemon.name,
          url: pokemon.url
        }));
      })
    );
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);

  }
}

