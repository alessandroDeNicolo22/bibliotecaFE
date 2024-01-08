import { NgModule } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { ElencoSpesainvestimentoComponent } from './elenco-spesainvestimento/elenco-spesainvestimento.component';


const routes: Routes = [
  {
    path: 'elenco',
    component: ElencoSpesainvestimentoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpesaInvestimentoRoutingModule {
}