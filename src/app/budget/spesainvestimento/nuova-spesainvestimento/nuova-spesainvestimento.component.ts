import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SottocategoriaService } from 'src/app/archivi/sottocategoria/sottocategoria.service';
import { AreaModel } from 'src/app/shared/model/area.model';
import { SpesaInvestimentoService } from '../spesainvestimento.service';
import { SottocategoriaModel } from 'src/app/shared/model/sottocategoria.model';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-nuova-spesainvestimento',
  templateUrl: './nuova-spesainvestimento.component.html',
  styleUrls: ['./nuova-spesainvestimento.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class NuovaSpesainvestimentoComponent {
  constructor(private service: SottocategoriaService, 
    private messageService: MessageService,
    private spesaService : SpesaInvestimentoService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig) { }

  formNuovo!: FormGroup;
  elencoSottocategoria!:SottocategoriaModel[];
  
  ngOnInit(): void {
    this.formNuovo = new FormGroup({
      spesainvestimento: new FormControl('', [Validators.required]),
      oSottocategoria: new FormControl(null, [Validators.required]),
    })
    this.service.getLista().subscribe((elenco:SottocategoriaModel[])=>{
      this.elencoSottocategoria = elenco;
    });
  }

  submitForm() {
    const spesaInvestimento: any = {
      spesainvestimento: this.formNuovo.controls['spesainvestimento'].value,
      oSottocategoria: this.formNuovo.controls['oSottocategoria'].value,
    }
    console.log(spesaInvestimento)
if (this.formNuovo.valid) {
      this.spesaService.save(spesaInvestimento).subscribe(
        () => {
          this.ref.close();
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  } 
}
