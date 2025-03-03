import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon-service';
import { ChatGptService } from '../../services/chatgpt.service';
import { CrudComponent } from '../crud/crud.component';
import { CrudService } from '../../services/crud.service';

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
  
  constructor(private pokemonService: PokemonService,private crudService: CrudService, private chatGptService: ChatGptService, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe(
        data => {
          console.log(data);
          this.pokemon = data;
        }, async error => {
          console.error('Es un pokemon de afuera del api:', error);
          this.pokemon = await this.crudService.getPokemonByName(name);
          console.log(this.pokemon);
        if (!this.pokemon) {
          console.error(`No se encontró el Pokémon con nombre: ${name}`);
        }
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