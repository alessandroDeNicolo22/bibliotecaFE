import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElencoGeneriComponent } from './elenco-generi/elenco-generi.component';
import { ModificaGenereComponent } from './modifica-genere/modifica-genere.component';
import { NuovoGenereComponent } from './nuovo-genere/nuovo-genere.component';



const routes: Routes = [{
  path: 'elenco',
  component: ElencoGeneriComponent,
},
 {
  path: 'modifica/:id',
  component: ModificaGenereComponent,
},
{
  path: 'nuovo',
  component: NuovoGenereComponent,
}, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenereRoutingModule { }