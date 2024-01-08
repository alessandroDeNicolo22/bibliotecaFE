import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { SottocategoriaService } from 'src/app/archivi/sottocategoria/sottocategoria.service';
import { SottocategoriaModel } from 'src/app/shared/model/sottocategoria.model';

@Component({
  selector: 'app-riconciliazione-budget',
  templateUrl: './riconciliazione-budget.component.html',
  styleUrls: ['./riconciliazione-budget.component.scss'],
  providers: [ConfirmationService, MessageService, DatePipe]
})
export class RiconciliazioneBudgetComponent {
  constructor(private service: SottocategoriaService, private messageService: MessageService, private datePipe: DatePipe) { }

  formNuovo!: FormGroup;
  pageIndex: number = 0;
  pageSize: number = 3;
  totRows !: number;
  elenco!: SottocategoriaModel[];

  ngOnInit(): void {
    this.formNuovo = new FormGroup({
      rangeDates: new FormControl(null, [Validators.required]),
    });
    this.service.getPage(this.pageIndex, this.pageSize).subscribe(
      (risposta: any) => {
        if(risposta.totalElements === 0 ){
          this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
        }
        this.elenco = risposta.content;
        this.totRows = risposta.totalElements;
      }
    )
  }


  submitForm() {

    let primaData = this.datePipe.transform(this.formNuovo.value.rangeDates[0], "yyyy-MM-dd");
    let secondaData = this.datePipe.transform(this.formNuovo.value.rangeDates[1], "yyyy-MM-dd");
    console.log(primaData, secondaData)
    if (secondaData !== null && primaData !== null) {
      this.service.riconciliazione(primaData, secondaData).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Budget Spesi aggiornati secondo le date di riferimento!' });
        this.reloadData()
      })
    }

  }
  reloadData() {
    this.service.getPage(this.pageIndex, this.pageSize).subscribe(
      (risposta: any) => {
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
    console.log(this.pageIndex, this.pageSize);
    this.service.getPage(this.pageIndex, this.pageSize).subscribe(
      (risposta: any) => {
        this.elenco = risposta.content;
        this.totRows = risposta.totalElements;
      }
    )
  }
}

