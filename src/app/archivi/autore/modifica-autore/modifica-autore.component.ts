import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoreService } from '../autore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutoreModel } from 'src/app/shared/model/autore-model';

@Component({
  selector: 'app-modifica-autore',
  templateUrl: './modifica-autore.component.html',
  styleUrls: ['./modifica-autore.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ModificaAutoreComponent {
  constructor(private service: AutoreService, private route: ActivatedRoute, private router: Router,private messageService: MessageService, private authservice: AuthenticationService) { }

  formModifica!: FormGroup;

  ngOnInit(): void {
    this.formModifica = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
    })

    this.route.params.subscribe(
      (params) => {
        var id = params['id'];
        this.service.getById(id).subscribe(
          (object) => {
            this.formModifica.controls['nome'].setValue(object.nome);
            this.formModifica.controls['cognome'].setValue(object.cognome);
          }
        )
      }
    )

  }


  submitForm() {
    var idAutore;
      this.route.params.subscribe(
        (params) => {
          idAutore = params['id'];
        }
      )
    const autore: AutoreModel = {
      id:idAutore,
      nome: this.formModifica.controls['nome'].value,
      cognome: this.formModifica.controls['cognome'].value,
    }

    if (this.formModifica.valid) {
      this.service.save(autore).subscribe(
        () => {
          this.router.navigate(['autore/elenco'])
          localStorage.setItem('autore', "1")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }

  inputNotEmpty(): boolean{
    const nome = this.formModifica.controls['nome'].value;
    const cognome = this.formModifica.controls['cognome'].value;
    
    return !nome || !cognome;
  }
}

