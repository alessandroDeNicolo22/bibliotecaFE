import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResgistrazioneComponent } from './resgistrazione/resgistrazione.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ElencoUtentiComponent } from './elenco-utenti/elenco-utenti.component';
import { ModificaUtenteComponent } from './modifica-utente/modifica-utente.component';



@NgModule({
  declarations: [
    ResgistrazioneComponent,
    LoginComponent,
    ElencoUtentiComponent,
    ModificaUtenteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }