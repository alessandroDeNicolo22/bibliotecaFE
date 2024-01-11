import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CasaEditriceService } from '../ce.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CasaEditriceModel } from 'src/app/shared/model/ce.model';

@Component({
  selector: 'app-modifica-ce',
  templateUrl: './modifica-ce.component.html',
  styleUrls: ['./modifica-ce.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ModificaCeComponent {
  constructor(private service: CasaEditriceService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) { }

  formModifica!: FormGroup;

  ngOnInit(): void {
    this.formModifica = new FormGroup({
      nome: new FormControl('', [Validators.required]),
    })

    this.route.params.subscribe(
      (params) => {
        var id = params['id'];
        this.service.getById(id).subscribe(
          (object) => {
            this.formModifica.controls['nome'].setValue(object.nome);
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
    const ce: CasaEditriceModel = {
      id: idAutore,
      nome: this.formModifica.controls['nome'].value,
    }

    if (this.formModifica.valid) {
      this.service.save(ce).subscribe(
        () => {
          this.router.navigate(['ce/elenco'])
          localStorage.setItem('ce', "1")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }

  inputNotEmpty(): boolean {
    const nome = this.formModifica.controls['nome'].value;

    return !nome;
  }
}
