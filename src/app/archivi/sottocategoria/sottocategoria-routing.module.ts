import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElencoSottocategorieComponent } from './elenco-sottocategorie/elenco-sottocategorie.component';
import { ModificaSottocategoriaComponent } from './modifica-sottocategoria/modifica-sottocategoria.component';
import { NuovaSottocategoriaComponent } from './nuova-sottocategoria/nuova-sottocategoria.component';



const routes: Routes = [{
  path: 'elenco',
  component: ElencoSottocategorieComponent,
},
 {
  path: 'modifica/:id',
  component: ModificaSottocategoriaComponent,
},
{
  path: 'nuovo',
  component: NuovaSottocategoriaComponent,
}, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SottocategoriaRoutingModule { }