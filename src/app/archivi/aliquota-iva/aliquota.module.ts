import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AliquotaRoutingModule } from './aliquota-routing.module';
import { ElencoAliquotaComponent } from './elenco-aliquota/elenco-aliquota.component';
import { ModificaAliquotaComponent } from './modifica-aliquota/modifica-aliquota.component';
import { NuovaAliquotaComponent } from './nuova-aliquota/nuova-aliquota.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ElencoAliquotaComponent,
    ModificaAliquotaComponent,
    NuovaAliquotaComponent
  ],
  imports: [
    CommonModule,
    AliquotaRoutingModule,
    SharedModule
  ]
})
export class AliquotaModule { }
