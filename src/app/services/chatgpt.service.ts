import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import {OpenAI} from "openai";
@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  private openai: OpenAI;
  apiKey: string = "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"

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
      max_tokens: 200
    });
    
    return from(completion);
  }
}
