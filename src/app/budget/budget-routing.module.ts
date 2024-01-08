import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefinizioneComponent } from './definizione/definizione.component';
import { AvanzamentoBudgetComponent } from './avanzamento/avanzamento-budget/avanzamento-budget.component';
import { RiconciliazioneBudgetComponent } from './riconciliazione/riconciliazione-budget/riconciliazione-budget.component';
import { ElencoSpesainvestimentoComponent } from './spesainvestimento/elenco-spesainvestimento/elenco-spesainvestimento.component';




const routes: Routes = [{
  path: 'definizione',
  component: DefinizioneComponent,
},
 {
  path: 'avanzamento',
  component: AvanzamentoBudgetComponent,
},
{
  path: 'riconciliazione',
  component: RiconciliazioneBudgetComponent,
},
{
  path: 'spesainvestimento',
  component: ElencoSpesainvestimentoComponent,
}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }