import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SottocategoriaService } from 'src/app/archivi/sottocategoria/sottocategoria.service';
import { AreaModel } from 'src/app/shared/model/area.model';

@Component({
  selector: 'app-definisci-budget',
  templateUrl: './definisci-budget.component.html',
  styleUrls: ['./definisci-budget.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DefinisciBudgetComponent {
  constructor(private service: SottocategoriaService, private messageService: MessageService, private route: ActivatedRoute, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  formModifica!: FormGroup;
  elencoAree!: AreaModel[];
  idSottoc!: number;
  idArea!: number;
  area!: string
  ngOnInit(): void {
    this.formModifica = new FormGroup({
      codice: new FormControl('', [Validators.required]),
      sottocategoria: new FormControl('', [Validators.required]),
      oArea: new FormControl('', [Validators.required]),
      budget: new FormControl(0, [Validators.required]),
      idArea: new FormControl(0)
    })
    this.formModifica.controls['codice'].disable(),
      this.formModifica.controls['sottocategoria'].disable(),
      this.formModifica.controls['oArea'].disable();

    this.service.getAree().subscribe((elenco: AreaModel[]) => {
      this.elencoAree = elenco;
    });
    this.idSottoc = this.config.data.product.id;
    this.service.getById(this.idSottoc).subscribe(
      (object) => {
        this.formModifica.controls['codice'].setValue(object.codice);
        this.formModifica.controls['sottocategoria'].setValue(object.sottocategoria);
        this.formModifica.controls['budget'].setValue(object.budget);
        this.formModifica.controls['oArea'].setValue(object.oArea?.area);
        this.formModifica.controls['idArea'].setValue(object.oArea?.id)
      }
    )

  }

  submitForm() {

    const sottocategoria: any = {
      id: this.idSottoc,
      codice: this.formModifica.controls['codice'].value,
      sottocategoria: this.formModifica.controls['sottocategoria'].value,
      oArea: this.elencoAree.find(area => area.id === this.formModifica.value.idArea),
      budget: this.formModifica.controls['budget'].value
    }
    console.log(sottocategoria)
    if (this.formModifica.valid) {
      this.service.salva(sottocategoria).subscribe(
        () => {
          this.ref.close('reload');
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }
}