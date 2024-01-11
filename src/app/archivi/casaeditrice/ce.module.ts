import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';
import { ElencoCeComponent } from './elenco-ce/elenco-ce.component';
import { ModificaCeComponent } from './modifica-ce/modifica-ce.component';
import { NuovoCeComponent } from './nuovo-ce/nuovo-ce.component';
import { CasaEditriceRoutingModule } from './ce-routing.module';



@NgModule({
  declarations: [
    ElencoCeComponent,
    ModificaCeComponent,
    NuovoCeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CasaEditriceRoutingModule
  ]
})
export class CasaEditriceModule { }