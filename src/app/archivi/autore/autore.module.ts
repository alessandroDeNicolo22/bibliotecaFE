import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';
import { ElencoAutoreComponent } from './elenco-autore/elenco-autore.component';
import { ModificaAutoreComponent } from './modifica-autore/modifica-autore.component';
import { NuovoAutoreComponent } from './nuovo-autore/nuovo-autore.component';
import { AutoreRoutingModule } from './autore-routing.module';


@NgModule({
  declarations: [
    ElencoAutoreComponent,
    ModificaAutoreComponent,
    NuovoAutoreComponent
  ],
  imports: [
    CommonModule,
    AutoreRoutingModule,
    SharedModule
  ]
})
export class AutoreModule { }
