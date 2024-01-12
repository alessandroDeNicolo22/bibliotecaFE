import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GenereService } from '../genere.service';
import { GenereModel } from 'src/app/shared/model/genere.model';


@Component({
  selector: 'app-nuovo-genere',
  templateUrl: './nuovo-genere.component.html',
  styleUrls: ['./nuovo-genere.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class NuovoGenereComponent {
  constructor(private service: GenereService, private router: Router, private messageService: MessageService) { }

  formNuovo!: FormGroup;
  
  ngOnInit(): void {
    this.formNuovo = new FormGroup({
      nome: new FormControl('', [Validators.required])
    })
  }


  submitForm() {

    const genere: GenereModel = {
      nome: this.formNuovo.controls['nome'].value
    }
    if (this.formNuovo.valid) {
      this.service.salva(genere).subscribe(
        () => {
          this.router.navigate(['genere/elenco'])
          localStorage.setItem('genere', "ok")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }
}
