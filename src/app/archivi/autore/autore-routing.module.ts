import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElencoAutoreComponent } from './elenco-autore/elenco-autore.component';
import { ModificaAutoreComponent } from './modifica-autore/modifica-autore.component';
import { NuovoAutoreComponent } from './nuovo-autore/nuovo-autore.component';


const routes: Routes = [{
  path: 'elenco',
  component: ElencoAutoreComponent,
},
 {
  path: 'modifica/:id',
  component: ModificaAutoreComponent,
},
{
  path: 'nuovo',
  component: NuovoAutoreComponent,
}, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoreRoutingModule { }
