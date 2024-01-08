import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SottocategoriaService } from 'src/app/archivi/sottocategoria/sottocategoria.service';
import { SottocategoriaModel } from 'src/app/shared/model/sottocategoria.model';
import { SpesaInvestimentoService } from '../spesainvestimento.service';


@Component({
  selector: 'app-modifica-spesainvestimento',
  templateUrl: './modifica-spesainvestimento.component.html',
  styleUrls: ['./modifica-spesainvestimento.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ModificaSpesainvestimentoComponent {
  constructor(private service: SpesaInvestimentoService, 
    private messageService: MessageService,
    private spesaService : SpesaInvestimentoService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private sottocategoriaService : SottocategoriaService) { }

  formModifica!: FormGroup;
  elencoSottocategoria!:SottocategoriaModel[];
  idSpesa!:number;

  ngOnInit(): void {
    this.formModifica = new FormGroup({
      spesainvestimento: new FormControl('', [Validators.required]),
      oSottocategoria: new FormControl(null, [Validators.required]),
    })
    this.sottocategoriaService.getLista().subscribe((risposta:SottocategoriaModel[])=>{
      this.elencoSottocategoria = risposta;
    })
    this.idSpesa = this.config.data.product.id;
    this.service.findById(this.idSpesa).subscribe((object)=>{
      this.formModifica.controls['spesainvestimento'].setValue(object.spesainvestimento);
      this.formModifica.controls['oSottocategoria'].setValue(object.oSottocategoria?.id);
    });
  }

  submitForm() {
    const spesaInvestimento: any = {
      id:this.idSpesa,
      spesainvestimento: this.formModifica.controls['spesainvestimento'].value,
      oSottocategoria: this.elencoSottocategoria.find(sottocategoria=> sottocategoria.id === this.formModifica.value.oSottocategoria)
    }
    if (this.formModifica.valid) {
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
