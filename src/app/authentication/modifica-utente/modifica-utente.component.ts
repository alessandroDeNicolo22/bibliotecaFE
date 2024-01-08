import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-resgistrazione',
  templateUrl: './modifica-utente.component.html',
  styleUrls: ['./modifica-utente.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ModificaUtenteComponent {
  constructor(private service: AuthenticationService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) { }

  formReg!: FormGroup;
  formPass!: FormGroup;
  ruoli: any[] = ['ADMIN', 'USER', 'SUPERVISOR'];
  idUtente: number = 0;
  titolo: string = 'Registrazione Utente.'
  subHeader: string = 'Registrati alla nostra piattaforma!'
  visible: boolean = false;
  visible1: boolean = false;

  ngOnInit(): void {
    this.formReg = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      ruolo: new FormControl('', [Validators.required]),
    })
    this.formPass = new FormGroup({
      passwordV: new FormControl('', [Validators.required]),
      passwordVC: new FormControl('', [Validators.required]),
      passwordN: new FormControl('', [Validators.required]),
      passwordNC: new FormControl('', [Validators.required]),

    })
    if (localStorage.getItem('modifica')) {
      this.titolo = "Modifica Utente";
      this.subHeader = "Modifica l'utente selezionato."
      const idUtente = localStorage.getItem('modifica');
      if (idUtente !== null) {
        this.idUtente = parseInt(idUtente);
        this.service.getById(parseInt(idUtente)).subscribe(
          (object) => {
            this.formReg.controls['nome'].setValue(object.nome);
            this.formReg.controls['cognome'].setValue(object.cognome);
            this.formReg.controls['email'].setValue(object.email);
            this.formReg.controls['ruolo'].setValue(object.role)
          }
        )
      }

    } else {
      this.titolo = "Modifica Utente";
      this.subHeader = "Modifica l'utente selezionato."
      const idUtente = localStorage.getItem('id');
      if (idUtente !== null) {
        this.idUtente = parseInt(idUtente);
        this.service.getById(parseInt(idUtente)).subscribe(
          (object) => {
            this.formReg.controls['nome'].setValue(object.nome);
            this.formReg.controls['cognome'].setValue(object.cognome);
            this.formReg.controls['email'].setValue(object.email);
            this.formReg.controls['ruolo'].setValue(object.role)
          }
        )
      }
    }

  }

  submitForm() {

    const utente: any = {
      id: this.idUtente,
      nome: this.formReg.controls['nome'].value,
      cognome: this.formReg.controls['cognome'].value,
      email: this.formReg.controls['email'].value,
      role: this.formReg.controls['ruolo'].value
    }
    console.log(utente)
    if (this.formReg.valid) {
      if(localStorage.getItem('modDaLogin')){

      
      this.service.salva(utente).subscribe(
        () => {
          localStorage.removeItem('modDaLogin');
          localStorage.removeItem('modifica')
          localStorage.setItem('logoutDaMod', '1');
          localStorage.removeItem('id')
          this.router.navigate([''])

        }
      )
      }else{
        this.service.salva(utente).subscribe(
          () => {           
            localStorage.removeItem('modifica')
            this.router.navigate(['utente/elenco'])
          }
        )
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }

  torna() {
    if (localStorage.getItem('modifica')) {
      this.router.navigate(['utente/elenco'])
      localStorage.removeItem('modifica')
    } else {
      this.router.navigate([''])
    }
  }

  modPassword() {
    if (!(localStorage.getItem('modifica'))) {
      this.visible = true;
    } else {
      if (localStorage.getItem('id') === localStorage.getItem('modifica')) {
        this.visible = true
      } else {
        this.messageService.add({ severity: 'error', summary: 'Negato', detail: 'Non è possibile modificare la password di questo Utente!' });
      }
    }

  }

  verificaPassword() {
    if (this.formPass.controls['passwordV'].value === this.formPass.controls['passwordVC'].value) {
      const idUtente = localStorage.getItem('id');
      if (idUtente !== null) {
        this.idUtente = parseInt(idUtente);
      }
      this.service.verifyPassword(this.idUtente, this.formPass.controls['passwordV'].value).subscribe(
        (risposta: Boolean) => {
          if (risposta) {
            this.visible1 = true;
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'La password che hai inserito non è corretta!' });
          }
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Errore', detail: 'Le password non corrispondono!' });
    }

  }

  modificaPassword() {
    if (this.formPass.controls['passwordN'].value === this.formPass.controls['passwordNC'].value) {
      const idUtente = localStorage.getItem('id');
      if (idUtente !== null) {
        this.idUtente = parseInt(idUtente);
      }
      console.log(idUtente)
      this.service.modifyPassword(this.idUtente, this.formPass.controls['passwordN'].value).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Password modificata con successo' });
          this.visible = false;
          this.visible1 = false;
        })

    } else {
      this.messageService.add({ severity: 'warn', summary: 'Errore', detail: 'Le password non corrispondono!' });
    }
  }
}


