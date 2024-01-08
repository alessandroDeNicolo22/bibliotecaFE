import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';;
import { SottocategoriaService } from 'src/app/archivi/sottocategoria/sottocategoria.service';
import { AreaModel } from 'src/app/shared/model/area.model';
import { SottocategoriaModel } from 'src/app/shared/model/sottocategoria.model';
import { DefinisciBudgetComponent } from './definisci-budget/definisci-budget.component';

@Component({
  selector: 'app-definizione',
  templateUrl: './definizione.component.html',
  styleUrls: ['./definizione.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService]
})
export class DefinizioneComponent {
  constructor(private service: SottocategoriaService, private messageService: MessageService, public dialogService: DialogService) { }
  ref: DynamicDialogRef | undefined;

  formNuovo!: FormGroup;
  elencoAree!: AreaModel[];
  viewTab: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 3;
  totRows !: number;
  elenco!: SottocategoriaModel[];
  formModifica!: FormGroup;

  ngOnInit(): void {
    this.formNuovo = new FormGroup({
      oArea: new FormControl('', [Validators.required]),
    });
    this.service.getAree().subscribe((elenco: AreaModel[]) => {
      this.elencoAree = elenco;
    });
  }


  submitForm() {
    console.log(this.formNuovo.value.oArea)
    if (this.formNuovo.valid) {
      this.service.ricercaPage(this.formNuovo.value.oArea, this.pageIndex, this.pageSize).subscribe(
        (risposta: any) => {
          if(risposta.totalElements === 0 ){
            this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
          }
          this.viewTab = true;
          this.elenco = risposta.content;       
          this.totRows = risposta.totalElements;         
          localStorage.setItem('budget', "ok")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }

  }

  onPageChange(event: PaginatorState) {
    if (event.rows !== undefined) {
      this.pageSize = event.rows;
    }
    if (event.first !== undefined) {
      this.pageIndex = event.first / this.pageSize;
    }
    console.log(this.pageIndex, this.pageSize);
    this.service.ricercaPage(this.formNuovo.value.oArea, this.pageIndex, this.pageSize).subscribe(
      (risposta: any) => {
        this.viewTab = true;
        this.elenco = risposta.content;
        console.log(this.elenco)
        this.totRows = risposta.totalElements;
        console.log(this.totRows)

        localStorage.setItem('budget', "ok")
      }
    )
  }

  change() {
    this.viewTab = false;
  }

  cerca(product: any) {
    this.ref = this.dialogService.open(DefinisciBudgetComponent, {
      data: {
        product
      },
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
    this.ref.onClose.subscribe(result => {
      if (result === 'reload') {
        this.reloadData();
      }
    });
  }

  reloadData() {
    this.service.ricercaPage(this.formNuovo.value.oArea, this.pageIndex, this.pageSize).subscribe(
      (risposta: any) => {
        this.viewTab = true;
        this.elenco = risposta.content;
        console.log(this.elenco)
        this.totRows = risposta.totalElements;
        console.log(this.totRows)
        this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Budget aggiornato con successo!' });
        localStorage.setItem('budget', "ok")
      }
    )
  }
}

