import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import {OpenAI} from "openai";
@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  private openai: OpenAI;
  apiKey: string = ""

  constructor() {
    this.openai = new OpenAI({
      apiKey: this.apiKey, dangerouslyAllowBrowser: true
    });
  }
  
  getPokemonDescription(pokemonName: string): Observable<any> {
    const completion = this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: 'system', content: `Describe el Pokémon ${pokemonName} de forma breve.` }],
      max_tokens: 100
    });
    
    return from(completion);
  }
}
