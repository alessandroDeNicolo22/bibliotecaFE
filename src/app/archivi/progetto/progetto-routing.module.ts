import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElencoProgettiComponent } from './elenco-progetti/elenco-progetti.component';
import { NuovoProgettoComponent } from './nuovo-progetto/nuovo-progetto.component';
import { ModificaProgettoComponent } from './modifica-progetto/modifica-progetto.component';

const routes: Routes = [
  {
    path: 'elenco',
    component: ElencoProgettiComponent
  },
  {
    path: 'nuovo',
    component: NuovoProgettoComponent
  },
  {
    path: 'modifica/:id',
    component: ModificaProgettoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgettoRoutingModule { }
