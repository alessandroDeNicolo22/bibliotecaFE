import { Component } from '@angular/core';
import { SpesaInvestimentoService } from '../spesainvestimento.service';
import { SottocategoriaService } from 'src/app/archivi/sottocategoria/sottocategoria.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpesaInvestimentoModel } from 'src/app/shared/model/spesainvestimento.model';
import { SottocategoriaModel } from 'src/app/shared/model/sottocategoria.model';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NuovaSpesainvestimentoComponent } from '../nuova-spesainvestimento/nuova-spesainvestimento.component';
import { ModificaSpesainvestimentoComponent } from '../modifica-spesainvestimento/modifica-spesainvestimento.component';

@Component({
  selector: 'app-elenco-spesainvestimento',
  templateUrl: './elenco-spesainvestimento.component.html',
  styleUrls: ['./elenco-spesainvestimento.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService]
})
export class ElencoSpesainvestimentoComponent {
  constructor(
    private service: SpesaInvestimentoService,
    private sottoCategoriaService: SottocategoriaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService
  ) { }
  ref: DynamicDialogRef | undefined;
  form!: FormGroup;
  elenco!: SpesaInvestimentoModel[];
  elencoSottocategoria!: SottocategoriaModel[];
  idSottoCategoria: number = 0;
  pageSize = 3;
  pageIndex = 0;
  totRows = 0;

  ngOnInit() {
    this.form = new FormGroup({
      sottocategoria: new FormControl(null, Validators.required),
    });
    this.sottoCategoriaService.getLista().subscribe((response: SottocategoriaModel[]) => {
      this.elencoSottocategoria = response;
    });
  }

  submitForm() {
    this.service.getSpesaInvestimentoByIdSottoCategoria(this.form.value.sottocategoria, this.pageIndex, this.pageSize).subscribe((risposta: any) => {
      this.elenco = risposta.content;
      this.totRows = risposta.totalElements;
    })
  }
  onPageChange(event: PaginatorState) {
    if (event.rows !== undefined) {
      this.pageSize = event.rows;
    }
    if (event.first !== undefined) {
      this.pageIndex = event.first / this.pageSize;
    }
    console.log(this.pageIndex, this.pageSize);
    this.service.getSpesaInvestimentoByIdSottoCategoria(this.form.value.sottocategoria, this.pageIndex, this.pageSize).subscribe((risposta: any) => {
      this.elenco = risposta.content;
      this.totRows = risposta.totalElements;
    });
  }
  deleteSpesa(id: number) {
    this.service.checkDelete(id).subscribe(
      (condizione) => {
        console.log(condizione);
        if (condizione === true) {
          this.confirmationService.confirm({

            message: 'Sei sicuro di eliminare questa Spesa Investimento?',
            header: 'Conferma Eliminazione',
            icon: 'pi pi-info-circle',
            accept: () => {
              this.service.delete(id).subscribe(
                () => {
                  if (this.elenco.length === 1 && this.pageIndex != 0) {
                    this.pageIndex--;
                  }
                  this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Spesa Investimento eliminata con successo!' });
                  this.submitForm();
                })

            },
            reject: (type: ConfirmEventType) => {
              switch (type) {
                case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Spesa Investimento non eliminata!' });
                  break;
                case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Richiesta cancellata!' });
                  break;
              }
            }
          });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Non eliminabile', detail: 'Spesa Investimento non eliminabile!' });
        }
      }
    )
  }
  add() {
    this.ref = this.dialogService.open(NuovaSpesainvestimentoComponent, {
      width: 'auto',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
    this.ref.onClose.subscribe(result => {
      this.submitForm();
    });
  }
  update(product: any) {
    this.ref = this.dialogService.open(ModificaSpesainvestimentoComponent, {
      data: {
        product
      },
      width: 'auto',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
    this.ref.onClose.subscribe(result => {
      this.submitForm();
    });
  }
}


