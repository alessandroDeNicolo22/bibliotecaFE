import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestioneComponent } from './gestione/gestione.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { NuovaFatturaComponent } from './nuova-fattura/nuova-fattura.component';
import { ModificaFatturaComponent } from './modifica-fattura/modifica-fattura.component';

const routes: Routes = [
  {
    path: 'gestione',
    component: GestioneComponent
  },
  {
    path: 'ricerca',
    component: RicercaComponent
  },
  {
    path: 'nuovo',
    component: NuovaFatturaComponent
  },
  {
    path: 'modifica/:id',
    component: ModificaFatturaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FatturaPassivaRoutingModule { }
