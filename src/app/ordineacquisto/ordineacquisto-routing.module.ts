import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { NuovoOrdineacquistoComponent } from './nuovo-ordineacquisto/nuovo-ordineacquisto.component';
import { GestioneOrdiniComponent } from './gestione-ordini/gestione-ordini.component';
import { ModificaOrdineacquistoComponent } from './modifica-ordineacquisto/modifica-ordineacquisto.component';
import { RicercaOrdiniComponent } from './ricerca-ordini/ricerca-ordini.component';



const routes: Routes = [
  {
    path: 'nuovo',
    component: NuovoOrdineacquistoComponent
  },
  {
    path: 'modifica/:id',
    component: ModificaOrdineacquistoComponent
  },
  {
    path: 'gestione',
    component: GestioneOrdiniComponent
  },
  {
    path: 'ricerca',
    component: RicercaOrdiniComponent
  } 
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdineAcquistoRoutingModule {
  /* constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (!event.url.startsWith('/ordine')) {
          localStorage.removeItem('idFornitore');
        }
      }
    })
  } */
}
