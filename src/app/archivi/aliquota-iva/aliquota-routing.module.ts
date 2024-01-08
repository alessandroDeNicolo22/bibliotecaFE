import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificaAliquotaComponent } from './modifica-aliquota/modifica-aliquota.component';
import { NuovaAliquotaComponent } from './nuova-aliquota/nuova-aliquota.component';
import { ElencoAliquotaComponent } from './elenco-aliquota/elenco-aliquota.component';

const routes: Routes = [{
  path: 'elenco',
  component: ElencoAliquotaComponent,
},
 {
  path: 'modifica/:id',
  component: ModificaAliquotaComponent,
},
{
  path: 'nuovo',
  component: NuovaAliquotaComponent,
}, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AliquotaRoutingModule { }
