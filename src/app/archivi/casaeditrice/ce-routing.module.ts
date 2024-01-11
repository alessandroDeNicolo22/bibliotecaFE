import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElencoCeComponent } from './elenco-ce/elenco-ce.component';
import { ModificaCeComponent } from './modifica-ce/modifica-ce.component';
import { NuovoCeComponent } from './nuovo-ce/nuovo-ce.component';



const routes: Routes = [{
  path: 'elenco',
  component: ElencoCeComponent,
},
 {
  path: 'modifica/:id',
  component: ModificaCeComponent,
},
{
  path: 'nuovo',
  component: NuovoCeComponent,
}, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasaEditriceRoutingModule { }
