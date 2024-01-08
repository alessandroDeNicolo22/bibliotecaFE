import { NgModule } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { ResgistrazioneComponent } from './resgistrazione/resgistrazione.component';
import { ElencoUtentiComponent } from './elenco-utenti/elenco-utenti.component';
import { ModificaUtenteComponent } from './modifica-utente/modifica-utente.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'registrazione',
    component: ResgistrazioneComponent,
  },
  {
    path:'elenco',
    component:ElencoUtentiComponent
  },
  {
    path:'modifica',
    component:ModificaUtenteComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {
}