import { Component } from '@angular/core';
import { AliquotaService } from '../aliquota.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AliquotaivaModel } from 'src/app/shared/model/aliquotaiva.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-nuova-aliquota',
  templateUrl: './nuova-aliquota.component.html',
  styleUrls: ['./nuova-aliquota.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class NuovaAliquotaComponent {
  constructor(private service: AliquotaService, private router: Router,private messageService: MessageService) { }

  formNuovo!: FormGroup;

  ngOnInit(): void {
    this.formNuovo = new FormGroup({
      aliquota: new FormControl('', [Validators.required]),
      descrizione: new FormControl('', [Validators.required]),

    })
  }


  submitForm() {

    const aliquota: AliquotaivaModel = {
      aliquota: this.formNuovo.controls['aliquota'].value,
      descrizione: this.formNuovo.controls['descrizione'].value,
    }

    if (this.formNuovo.valid) {
      this.service.salva(aliquota).subscribe(
        () => {
          this.router.navigate(['aliquota/elenco'])
          localStorage.setItem('aliquota', "ok")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }
}
