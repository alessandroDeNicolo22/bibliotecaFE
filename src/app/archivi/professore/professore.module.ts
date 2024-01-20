import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';
import { ElencoProfessoriComponent } from './elenco-professori/elenco-professori.component';
import { NuovoProfessoreComponent } from './nuovo-professore/nuovo-professore.component';
import { ModificaProfessoreComponent } from './modifica-professore/modifica-professore.component';
import { ProfessoreRoutingModule } from './professore-routing.module';


@NgModule({
  declarations: [
    ElencoProfessoriComponent,
    NuovoProfessoreComponent,
    ModificaProfessoreComponent
  ],
  imports: [
    CommonModule,
    ProfessoreRoutingModule,
    SharedModule
  ]
})
export class ProfessoreModule { }
