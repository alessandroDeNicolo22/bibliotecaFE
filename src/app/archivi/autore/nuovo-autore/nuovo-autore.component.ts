import { Component } from '@angular/core';
import { AutoreService } from '../autore.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutoreModel } from 'src/app/shared/model/autore-model';

@Component({
  selector: 'app-nuovo-autore',
  templateUrl: './nuovo-autore.component.html',
  styleUrls: ['./nuovo-autore.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class NuovoAutoreComponent {
  constructor(private service: AutoreService, private router: Router,private messageService: MessageService) { }

  formNuovo!: FormGroup;

  ngOnInit(): void {
    this.formNuovo = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),

    })
  }


  submitForm() {
    const autore: AutoreModel = {
      nome: this.formNuovo.controls['nome'].value,
      cognome: this.formNuovo.controls['cognome'].value,
      nomeCognome: this.formNuovo.controls['nomeCognome'].value
    }

    if (this.formNuovo.valid) {
      this.service.save(autore).subscribe(
        () => {
          this.router.navigate(['autore/elenco'])
          localStorage.setItem('autore', "ok")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }

  inputNotEmpty(): boolean{
    const nome = this.formNuovo.controls['nome'].value;
    const cognome = this.formNuovo.controls['cognome'].value;
    
    return !nome || !cognome;
  }
}
