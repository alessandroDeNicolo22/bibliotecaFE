import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElencoProfessoriComponent } from './elenco-professori/elenco-professori.component';
import { NuovoProfessoreComponent } from './nuovo-professore/nuovo-professore.component';
import { ModificaProfessoreComponent } from './modifica-professore/modifica-professore.component';


const routes: Routes = [
  {
    path: 'elenco',
    component: ElencoProfessoriComponent
  },
  {
    path: 'nuovo',
    component: NuovoProfessoreComponent
  },
  {
    path: 'modifica/:id',
    component: ModificaProfessoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessoreRoutingModule { }
