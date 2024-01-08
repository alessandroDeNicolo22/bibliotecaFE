import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ElencoFornitoriComponent } from './elenco-fornitori/elenco-fornitori.component';
import { ModificaFornitoreComponent } from './modifica-fornitore/modifica-fornitore.component';
import { NuovoFornitoreComponent } from './nuovo-fornitore/nuovo-fornitore.component';
import { FornitoreRoutingModule } from './fornitore-routing.module';


@NgModule({
  declarations: [
    ElencoFornitoriComponent,
    ModificaFornitoreComponent,
    NuovoFornitoreComponent
  ],
  imports: [
    CommonModule,
    FornitoreRoutingModule,
    SharedModule
  ]
})
export class FornitoreModule { }