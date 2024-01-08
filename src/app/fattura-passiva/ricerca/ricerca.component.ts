import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FatturaPassivaService } from '../fattura-passiva.service';
import { PreventivoService } from 'src/app/preventivo/preventivo.service';
import { FornitoreService } from 'src/app/archivi/fornitore/fornitore.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { SottocategoriaService } from 'src/app/archivi/sottocategoria/sottocategoria.service';
import { FornitoreModel } from 'src/app/shared/model/fornitore.model';
import { SottocategoriaModel } from 'src/app/shared/model/sottocategoria.model';
import { PreventivoModel } from 'src/app/shared/model/preventivo-model';
import { FatturaPassivaModel } from 'src/app/shared/model/fattura-passiva.model';
import { FatturaPassivaDettaglioModel } from 'src/app/shared/model/fattura-passiva-dettaglio.model';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService, DatePipe]
})
export class RicercaComponent {

  constructor(private service: FatturaPassivaService,
    private messageService: MessageService,
    public dialogService: DialogService,
    public fornitoreService: FornitoreService,
    private preventivoService: PreventivoService,
    private sottoCService: SottocategoriaService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe) { }
  types: any[] = ['Nessun Filtro', 'Fornitore', 'Sottocategoria', 'Preventivo']
  ref: DynamicDialogRef | undefined;
  formNuovo!: FormGroup;
  elencoFornitore!: FornitoreModel[];
  elencoPreventivi!: PreventivoModel[];
  elencoSottocategoria!: SottocategoriaModel[];
  pageIndex: number = 0;
  pageSize: number = 3;
  totRows !: number;
  totRowsd!: number;
  pageIndexd: number = 0;
  pageSized: number = 3;
  elenco!: FatturaPassivaModel[];
  visible: boolean = false;
  dettagli!: FatturaPassivaDettaglioModel[];
  idDettaglio!: number;

  ngOnInit(): void {

    this.formNuovo = new FormGroup({
      tipo: new FormControl("", [Validators.required]),
      rangeDates: new FormControl(null, [Validators.required]),
      id: new FormControl(0, [Validators.required])
    });
    this.fornitoreService.getLista().subscribe((elenco: FornitoreModel[]) => {
      this.elencoFornitore = elenco;
    });
    this.sottoCService.getLista().subscribe((elenco: SottocategoriaModel[]) => {
      this.elencoSottocategoria = elenco;
    })
    this.preventivoService.getLista().subscribe((elenco: PreventivoModel[]) => {
      this.elencoPreventivi = elenco;
    })
  }

  submitForm() {
    if (this.formNuovo.value.tipo === 'Nessun Filtro' || this.formNuovo.value.tipo === '') {
      let primaData = this.datePipe.transform(this.formNuovo.value.rangeDates[0], "yyyy-MM-dd");
      let secondaData = this.datePipe.transform(this.formNuovo.value.rangeDates[1], "yyyy-MM-dd");
      const object: any = {
        startDate: primaData,
        endDate: secondaData,
        type: "",
        id: 0
      }
      if (secondaData !== null) {
        this.service.filtraSoloPerData(object, this.pageIndex, this.pageSize).subscribe(
          (risposta: any) => {
            this.elenco = risposta.content;
            this.totRows = risposta.totalElements;
          }
        )
      }
    } else {
      if(this.formNuovo.value.rangeDates !== null){
      let primaData = this.datePipe.transform(this.formNuovo.value.rangeDates[0], "yyyy-MM-dd");
      let secondaData = this.datePipe.transform(this.formNuovo.value.rangeDates[1], "yyyy-MM-dd");
      const object: any = {
        startDate: primaData,
        endDate: secondaData,
        type: this.formNuovo.controls['tipo'].value,
        id: this.formNuovo.controls['id'].value
      }
      if (secondaData !== null) {
        this.service.filtraPerData(object, this.pageIndex, this.pageSize).subscribe(
          (risposta: any) => {
            this.elenco = risposta.content;
            this.totRows = risposta.totalElements;
          }
        )
      }
    }
    }
  }

  onPageChange(event: PaginatorState) {
    if (event.rows !== undefined) {
      this.pageSize = event.rows;
    }
    if (event.first !== undefined) {
      this.pageIndex = event.first / this.pageSize;
    }
    this.submitForm();
  }
  deleteOrdine(id: number) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di eliminare questa fattura?',
      header: 'Conferma Eliminazione',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.delete(id).subscribe(
          () => {
            if (this.elenco.length === 1 && this.pageIndex !== 0) {
              this.pageIndex--;
            }
            this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Fattura e dettagli eliminati con successo!' });
            
            this.submitForm();
          })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Fattura non eliminata!' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Richiesta cancellata!' });
            break;
        }
      }
    });
  }
  openDetails(id: number) {
    this.visible = true;
    this.idDettaglio = id;
    this.service.getDettagliPage(id, this.pageIndexd, this.pageSized).subscribe((risposta: any) => {
      this.dettagli = risposta.content;
      this.totRowsd = risposta.totalElements;
    })
  }
  
  onPageChange1(event: PaginatorState) {
    if (event.rows !== undefined) {
      this.pageSized = event.rows;
    }
    if (event.first !== undefined) {
      this.pageIndexd = event.first / this.pageSized;
    }
    this.service.getDettagliPage(this.idDettaglio, this.pageIndexd, this.pageSized).subscribe(
      (risposta: any) => {
        this.dettagli = risposta.content;
        this.totRows = risposta.totalElements;
      }
    )
  }

}
