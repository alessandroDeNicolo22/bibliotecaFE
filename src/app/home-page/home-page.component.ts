import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('titleAnimation', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', animate('1000ms ease-in')),
    ]),
  ],
  providers: [ConfirmationService, MessageService]
})
export class HomepageComponent {
  constructor(private messageService: MessageService, private service : AuthenticationService) { }
  titleState: string = 'hidden';

  ngOnInit() {
    setTimeout(() => {
      this.titleState = 'visible';
    }, 500);

  }

  ngAfterViewInit(){
    if(localStorage.getItem('utente') === '1'){
    this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Utente correttamente registrato! Ora puoi eseguire il Login.' });
    localStorage.removeItem('utente')
    }else if(localStorage.getItem('utente') === '3'){
      this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Benvenuto!' });
      localStorage.removeItem('utente')
    }else if(localStorage.getItem('nopermessi') === '1'){
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non hai i permessi per accedere all\'indirizzo selezionato' });
      localStorage.removeItem('nopermessi');
    }else if(localStorage.getItem('nopermessi') === '2'){
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non hai i permessi per accedere all\'indirizzo selezionato' });
      localStorage.removeItem('nopermessi');
    }else if(localStorage.getItem('logoutDaMod') && localStorage.getItem('modDaLogin') !== '1'){
      this.service.logout();
      this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Utente correttamente modificato! Esegui il Login' });
      localStorage.clear()
    }else if(localStorage.getItem('logout')){
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Utente scollegato! Accedi per utilizzare le nostre funzioni!' });
      localStorage.clear()
    }
  }

   ngDoCheck(){
    if(localStorage.getItem('logout')){
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Utente scollegato! Accedi per utilizzare le nostre funzioni!' });
      localStorage.removeItem('logout');
      localStorage.removeItem('nomeCognome');
    }
  }
}
