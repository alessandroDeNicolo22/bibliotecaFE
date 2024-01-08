import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DefinizioneComponent } from './definizione/definizione.component';
import { BudgetRoutingModule } from './budget-routing.module';
import { DefinisciBudgetComponent } from './definizione/definisci-budget/definisci-budget.component';
import { AvanzamentoBudgetComponent } from './avanzamento/avanzamento-budget/avanzamento-budget.component';
import { RiconciliazioneBudgetComponent } from './riconciliazione/riconciliazione-budget/riconciliazione-budget.component';
import { ElencoSpesainvestimentoComponent } from './spesainvestimento/elenco-spesainvestimento/elenco-spesainvestimento.component';
import { NuovaSpesainvestimentoComponent } from './spesainvestimento/nuova-spesainvestimento/nuova-spesainvestimento.component';
import { ModificaSpesainvestimentoComponent } from './spesainvestimento/modifica-spesainvestimento/modifica-spesainvestimento.component';


@NgModule({
  declarations: [
  DefinizioneComponent,
  DefinisciBudgetComponent,
  AvanzamentoBudgetComponent,
  RiconciliazioneBudgetComponent,
  ElencoSpesainvestimentoComponent,
  NuovaSpesainvestimentoComponent,
  ModificaSpesainvestimentoComponent
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    SharedModule
  ]
})
export class BudgetModule { }