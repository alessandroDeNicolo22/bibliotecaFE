import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class LoginComponent {
  constructor(private service: AuthenticationService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) { }

  formLog!: FormGroup;

  ngOnInit(): void {
    this.formLog = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  ngAfterViewInit(){
    if(localStorage.getItem('sescaduta')){
    this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Sessione scaduta! Eseguire il Login.' });
    localStorage.removeItem('sescaduta');
    localStorage.removeItem('id');
    localStorage.removeItem('modDaLogin');
    localStorage.removeItem('nomeCognome');
    localStorage.removeItem('logoutDaMod');
  }else if(localStorage.getItem('nonloggato')){
    this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non sei loggato! Eseguire il Login.' });
    localStorage.removeItem('nonloggato');
  }
}
submitForm() {
    const utente: any = {
      email: this.formLog.controls['email'].value,
      password: this.formLog.controls['password'].value
    }
    console.log(utente)
    if (this.formLog.valid) {
      this.service.auth(utente).subscribe(
        () => {
        localStorage.setItem('utente', '3');
        this.router.navigate(['']);
        this.service.findByEmail(utente.email).subscribe((risposta:any)=>{
          localStorage.setItem('nomeCognome', risposta.nome + " " + risposta.cognome)
          localStorage.setItem('id', risposta.id);
        })
        },
        (error) => {
          if (error.status === 401) {
            this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Credenziali errate!' });
            this.formLog.reset();
          } else if (error.status === 500) {
            this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Errore del server!' });
          }
      
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }
}
