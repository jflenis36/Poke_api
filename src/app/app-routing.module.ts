import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './pages/records/records.component';
import { ViewPokemonComponent } from './pages/view-pokemon/view-pokemon.component';

const routes: Routes = [
  { path: 'records', component: RecordsComponent },
  { path: 'view/:pokemon', component: ViewPokemonComponent },
  { path: '**', redirectTo: 'records' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
