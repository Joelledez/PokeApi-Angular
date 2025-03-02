import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon-service';
import { ChatGptService } from '../../services/chatgpt.service';

@Component({
  selector: 'app-pokemon-details',
  standalone: false,
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})

export class PokemonDetailsComponent implements OnInit {
  pokemon: any;
  description: string = 'Cargando descripción...';
  
  back(): void { 
    this.router.navigate(['']);
  }
  
  constructor(private pokemonService: PokemonService, private chatGptService: ChatGptService, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe(
        data => {
          this.pokemon = data;
        });
      this.chatGptService.getPokemonDescription(name).subscribe(response => {
        this.description = response.choices[0].message.content;
      }, error => {
        console.error('Error al obtener la descripción:', error);
        this.description = 'No se pudo obtener la descripción.';
      });
    }
  }
}