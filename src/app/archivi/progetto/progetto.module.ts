import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgettoRoutingModule } from './progetto-routing.module';
import { ElencoProgettiComponent } from './elenco-progetti/elenco-progetti.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NuovoProgettoComponent } from './nuovo-progetto/nuovo-progetto.component';
import { ModificaProgettoComponent } from './modifica-progetto/modifica-progetto.component';


@NgModule({
  declarations: [
    ElencoProgettiComponent,
    NuovoProgettoComponent,
    ModificaProgettoComponent
  ],
  imports: [
    CommonModule,
    ProgettoRoutingModule,
    SharedModule
  ]
})
export class ProgettoModule { }
