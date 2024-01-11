import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CasaEditriceService } from '../ce.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CasaEditriceModel } from 'src/app/shared/model/ce.model';

@Component({
  selector: 'app-nuovo-ce',
  templateUrl: './nuovo-ce.component.html',
  styleUrls: ['./nuovo-ce.component.scss'],
  providers:[ConfirmationService, MessageService]
})
export class NuovoCeComponent {
  constructor(private service: CasaEditriceService, private router: Router,private messageService: MessageService) { }

  formNuovo!: FormGroup;

  ngOnInit(): void {
    this.formNuovo = new FormGroup({
      nome: new FormControl('', [Validators.required]),
    })
  }


  submitForm() {
    const ce: CasaEditriceModel = {
      nome: this.formNuovo.controls['nome'].value,
    }

    if (this.formNuovo.valid) {
      this.service.save(ce).subscribe(
        () => {
          this.router.navigate(['ce/elenco'])
          localStorage.setItem('ce', "ok")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }

  inputNotEmpty(): boolean{
    const nome = this.formNuovo.controls['nome'].value;
    return !nome;
  }
}
