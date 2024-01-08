import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { AggiungiAreaComponent } from './aggiungi-area/aggiungi-area.component';
import { ElencoAreeComponent } from './elenco-aree/elenco-aree.component';
import { ModificaAreaComponent } from './modifica-area/modifica-area.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AggiungiAreaComponent,
    ElencoAreeComponent,
    ModificaAreaComponent
  ],
  imports: [
    CommonModule,
    AreaRoutingModule,
    SharedModule
  ]
})
export class AreaModule { }
