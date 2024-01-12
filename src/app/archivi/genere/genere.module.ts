import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { ElencoGeneriComponent } from './elenco-generi/elenco-generi.component';
import { NuovoGenereComponent } from './nuovo-genere/nuovo-genere.component';
import { ModificaGenereComponent } from './modifica-genere/modifica-genere.component';
import { GenereRoutingModule } from './genere-routing.module';


@NgModule({
  declarations: [
    ElencoGeneriComponent,
    NuovoGenereComponent,
    ModificaGenereComponent
  ],
  imports: [
    CommonModule,
    GenereRoutingModule,
    SharedModule
  ]
})
export class GenereModule { }