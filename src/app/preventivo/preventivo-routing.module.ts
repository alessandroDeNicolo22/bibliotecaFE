import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { GestionePreventiviComponent } from './gestione-preventivi/gestione-preventivi.component';
import { NuovoPreventivoComponent } from './nuovo-preventivo/nuovo-preventivo.component';
import { ModificaPreventivoComponent } from './modifica-preventivo/modifica-preventivo.component';

const routes: Routes = [
  {
    path: 'gestione',
    component: GestionePreventiviComponent
  },
  {
    path: 'nuovo',
    component: NuovoPreventivoComponent
  },
  {
    path: 'modifica/:id',
    component: ModificaPreventivoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreventivoRoutingModule { 
  constructor(private router: Router) {
    this.router.events.subscribe(event => { //per sentire la route
      if (event instanceof NavigationEnd) {
        if (!event.url.startsWith('/preventivo')) {
          localStorage.removeItem('idFornitoreScelto');
        }
      }
    });
  }
}
