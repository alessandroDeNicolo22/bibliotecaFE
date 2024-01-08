import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-resgistrazione',
  templateUrl: './resgistrazione.component.html',
  styleUrls: ['./resgistrazione.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ResgistrazioneComponent {
  constructor(private service: AuthenticationService,private router: Router, private messageService: MessageService, private route: ActivatedRoute) { }

  formReg!: FormGroup;
  ruoli:any[] = ['ADMIN','USER','SUPERVISOR'];
  
  

  ngOnInit(): void {
    this.formReg = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      ruolo: new FormControl('', [Validators.required]),
    })
}

  submitForm() {

    const utente: any = {
      id: 0,
      nome: this.formReg.controls['nome'].value,
      cognome: this.formReg.controls['cognome'].value,
      email: this.formReg.controls['email'].value,
      password: this.formReg.controls['password'].value,
      role: this.formReg.controls['ruolo'].value
    }
    console.log(utente)
    if (this.formReg.valid) {
      this.service.checkEmail(utente).subscribe((risposta:Boolean)=>{
        if(risposta === true){
          this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Email già esistente!' });
        }else{
          this.service.salva(utente).subscribe(
        () => {
          localStorage.setItem('utente', "1")
          this.router.navigate([''])
        }
      )
        }
      })      
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  } 
}

