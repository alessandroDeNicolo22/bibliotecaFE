import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GenereService } from '../genere.service';
import { GenereModel } from 'src/app/shared/model/genere.model';

@Component({
  selector: 'app-modifica-genere',
  templateUrl: './modifica-genere.component.html',
  styleUrls: ['./modifica-genere.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ModificaGenereComponent {
  constructor(private service: GenereService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) { }

  formModifica!: FormGroup;
  idGenere!: number;
  
  ngOnInit(): void {
    this.formModifica = new FormGroup({
      nome: new FormControl('', [Validators.required])
    })
    this.route.params.subscribe(
      (params) => {
        this.idGenere = params['id'];
        this.service.getById(this.idGenere).subscribe(
          (object) => {
            this.formModifica.controls['nome'].setValue(object.nome);
          }
        )
      }
    )
  }


  submitForm() {

    const genere: GenereModel = {
      id: this.idGenere,
      nome: this.formModifica.controls['nome'].value
    }
    if (this.formModifica.valid) {
      this.service.salva(genere).subscribe(
        () => {
          this.router.navigate(['genere/elenco'])
          localStorage.setItem('genere', "1")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }
}


