import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElencoLibriComponent } from './elenco-libri/elenco-libri.component';
import { ModificaLibroComponent } from './modifica-libro/modifica-libro.component';
import { NuovoLibroComponent } from './nuovo-libro/nuovo-libro.component';



const routes: Routes = [{
  path: 'elenco',
  component: ElencoLibriComponent,
},
 {
  path: 'modifica/:id',
  component: ModificaLibroComponent,
},
{
  path: 'nuovo',
  component: NuovoLibroComponent,
}, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibroRoutingModule { }