import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { NuovaSottocategoriaComponent } from './nuova-sottocategoria/nuova-sottocategoria.component';
import { ModificaSottocategoriaComponent } from './modifica-sottocategoria/modifica-sottocategoria.component';
import { ElencoSottocategorieComponent } from './elenco-sottocategorie/elenco-sottocategorie.component';
import { SottocategoriaRoutingModule } from './sottocategoria-routing.module';


@NgModule({
  declarations: [
    ElencoSottocategorieComponent,
    ModificaSottocategoriaComponent,
    NuovaSottocategoriaComponent
  ],
  imports: [
    CommonModule,
    SottocategoriaRoutingModule,
    SharedModule
  ]
})
export class SottocategoriaModule { }