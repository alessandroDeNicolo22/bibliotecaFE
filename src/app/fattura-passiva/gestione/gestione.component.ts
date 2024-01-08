import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FatturaPassivaModel } from 'src/app/shared/model/fattura-passiva.model';
import { FatturaPassivaService } from '../fattura-passiva.service';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { FornitoreService } from 'src/app/archivi/fornitore/fornitore.service';
import { FornitoreModel } from 'src/app/shared/model/fornitore.model';
import { FatturaPassivaDettaglioModel } from 'src/app/shared/model/fattura-passiva-dettaglio.model';

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService]
})
export class GestioneComponent implements OnInit {

  constructor(private service: FatturaPassivaService,
    private messageService: MessageService,
    public dialogService: DialogService,
    public fornitoreService: FornitoreService,
    private confirmationService: ConfirmationService) { }
  
    ref: DynamicDialogRef | undefined;
  formNuovo!: FormGroup;
  elencoFornitore!: FornitoreModel[];
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
  rows3!:Number;
  ngOnInit(): void {
    
    this.formNuovo = new FormGroup({
      oFornitore: new FormControl(null, [Validators.required]),
    });
    this.fornitoreService.getLista().subscribe((elenco: FornitoreModel[]) => {
      this.elencoFornitore = elenco;
    });
    const fornitorIDString = localStorage.getItem('fornitore');
    if (fornitorIDString !== null) {
      const fornitorID = parseInt(fornitorIDString);
      this.formNuovo.controls['oFornitore'].setValue(fornitorID);
      this.submitForm();
      localStorage.removeItem('fornitore')
    }
  }

  submitForm() {
      this.service.getPage(this.formNuovo.value.oFornitore, this.pageIndex, this.pageSize).subscribe(
        (risposta: any) => {
          if(localStorage.getItem('message')){
            this.messageService.add({ severity: 'success', summary: 'Attenzione', detail: 'Fattura e dettagli aggiunti con successo!' });
            localStorage.removeItem('message');
          }
          if(risposta.totalElements === 0 ){
            this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
          }
          this.elenco = risposta.content;
          this.totRows = risposta.totalElements;
        }
      )
  }

  onPageChange(event: PaginatorState) {
    if (event.rows !== undefined) {
      this.pageSize = event.rows;
    }
    if (event.first !== undefined) {
      this.pageIndex = event.first / this.pageSize;
    }
    this.service.getPage(this.formNuovo.value.oFornitore, this.pageIndex, this.pageSize).subscribe(
      (risposta: any) => {
        this.elenco = risposta.content;

        this.totRows = risposta.totalElements;
      }
    )
  }
  deleteFattura(id: number) {
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
