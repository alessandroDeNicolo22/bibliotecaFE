import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElencoFornitoriComponent } from './elenco-fornitori/elenco-fornitori.component';
import { ModificaFornitoreComponent } from './modifica-fornitore/modifica-fornitore.component';
import { NuovoFornitoreComponent } from './nuovo-fornitore/nuovo-fornitore.component';


const routes: Routes = [{
  path: 'elenco',
  component: ElencoFornitoriComponent,
},
 {
  path: 'modifica/:id',
  component: ModificaFornitoreComponent,
},
{
  path: 'nuovo',
  component: NuovoFornitoreComponent,
}, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornitoreRoutingModule { }