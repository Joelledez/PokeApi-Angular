import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { CrudComponent } from './components/crud/crud.component';
import path from 'path';

const routes: Routes = [
  { path: '', component: PokemonListComponent},
  { path: 'pokemon/:name', component: PokemonDetailsComponent},
  { path: 'crud', component: CrudComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
