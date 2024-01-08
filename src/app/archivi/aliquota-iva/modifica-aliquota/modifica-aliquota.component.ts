import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AliquotaivaModel } from 'src/app/shared/model/aliquotaiva.model';
import { AliquotaService } from '../aliquota.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-modifica-aliquota',
  templateUrl: './modifica-aliquota.component.html',
  styleUrls: ['./modifica-aliquota.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ModificaAliquotaComponent {
  constructor(private service: AliquotaService, private route: ActivatedRoute, private router: Router,private messageService: MessageService, private authservice: AuthenticationService) { }

  formModifica!: FormGroup;
  idAliquota!:number;

  ngOnInit(): void {
    this.formModifica = new FormGroup({
      aliquota: new FormControl('', [Validators.required]),
      descrizione: new FormControl('', [Validators.required]),
    })
    this.route.params.subscribe(
      (params) => {
        this.idAliquota = params['id'];
        this.service.getById(this.idAliquota).subscribe(
          (object) => {
            this.formModifica.controls['descrizione'].setValue(object.descrizione);
            this.formModifica.controls['aliquota'].setValue(object.aliquota);
          }
        )
      }
    )

  }


  submitForm() {

    const aliquota: AliquotaivaModel = {
      id:this.idAliquota,
      aliquota: this.formModifica.controls['aliquota'].value,
      descrizione: this.formModifica.controls['descrizione'].value,
    }

    if (this.formModifica.valid) {
      this.service.salva(aliquota).subscribe(
        () => {
          this.router.navigate(['aliquota/elenco'])
          localStorage.setItem('aliquota', "1")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }
}
