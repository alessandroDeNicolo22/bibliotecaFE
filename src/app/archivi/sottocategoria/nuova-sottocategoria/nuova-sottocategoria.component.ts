import { Component } from '@angular/core';
import { SottocategoriaService } from '../sottocategoria.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SottocategoriaModel } from 'src/app/shared/model/sottocategoria.model';
import { AreaModel } from 'src/app/shared/model/area.model';

@Component({
  selector: 'app-nuova-sottocategoria',
  templateUrl: './nuova-sottocategoria.component.html',
  styleUrls: ['./nuova-sottocategoria.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class NuovaSottocategoriaComponent {
  constructor(private service: SottocategoriaService, private router: Router, private messageService: MessageService) { }

  formNuovo!: FormGroup;
  elencoAree!:AreaModel[];
  
  ngOnInit(): void {
    this.formNuovo = new FormGroup({
      codice: new FormControl('', [Validators.required]),
      sottocategoria: new FormControl('', [Validators.required]),
      oArea: new FormControl(null, [Validators.required]),
      budget: new FormControl(0, [Validators.required])
    })
    this.service.getAree().subscribe((elenco:AreaModel[])=>{
      this.elencoAree = elenco;
    });
  }
  submitForm() {

    const sottocategoria: any = {
      codice: this.formNuovo.controls['codice'].value,
      sottocategoria: this.formNuovo.controls['sottocategoria'].value,
      oArea: this.formNuovo.controls['oArea'].value,
      budget: this.formNuovo.controls['budget'].value
    }
    console.log(sottocategoria)
    if (this.formNuovo.valid) {
      this.service.salva(sottocategoria).subscribe(
        () => {
          this.router.navigate(['sottocategoria/elenco'])
          localStorage.setItem('sottocategoria', "ok")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }
}

