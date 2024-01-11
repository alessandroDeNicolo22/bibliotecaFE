import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';
import { ElencoLibriComponent } from './elenco-libri/elenco-libri.component';
import { ModificaLibroComponent } from './modifica-libro/modifica-libro.component';
import { NuovoLibroComponent } from './nuovo-libro/nuovo-libro.component';
import { LibroRoutingModule } from './libro-routing.module';



@NgModule({
  declarations: [
    ElencoLibriComponent,
    ModificaLibroComponent,
    NuovoLibroComponent
  ],
  imports: [
    CommonModule,
    LibroRoutingModule,
    SharedModule
  ]
})
export class LibroModule { }
