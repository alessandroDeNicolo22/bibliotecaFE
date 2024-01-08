import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggiungiAreaComponent } from './aggiungi-area/aggiungi-area.component';
import { ElencoAreeComponent } from './elenco-aree/elenco-aree.component';
import { ModificaAreaComponent } from './modifica-area/modifica-area.component';

const routes: Routes = [
  {
    path: 'elenco',
    component: ElencoAreeComponent
  },
  {
    path: 'nuovo',
    component: AggiungiAreaComponent
  },
  {
    path: 'modifica/:id',
    component: ModificaAreaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaRoutingModule { }
