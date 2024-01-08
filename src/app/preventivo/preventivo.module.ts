import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreventivoRoutingModule } from './preventivo-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GestionePreventiviComponent } from './gestione-preventivi/gestione-preventivi.component';
import { NuovoPreventivoComponent } from './nuovo-preventivo/nuovo-preventivo.component';
import { ModificaPreventivoComponent } from './modifica-preventivo/modifica-preventivo.component';


@NgModule({
  declarations: [
    GestionePreventiviComponent,
    NuovoPreventivoComponent,
    ModificaPreventivoComponent
  ],
  imports: [
    CommonModule,
    PreventivoRoutingModule,
    SharedModule
  ]
})
export class PreventivoModule { }
