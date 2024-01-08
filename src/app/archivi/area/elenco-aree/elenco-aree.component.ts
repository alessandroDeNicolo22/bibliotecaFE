import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaModel } from 'src/app/shared/model/area-model';
import { AreaService } from '../area.service';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Router } from '@angular/router';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-elenco-aree',
  templateUrl: './elenco-aree.component.html',
  styleUrls: ['./elenco-aree.component.scss'],
  providers: [ConfirmationService, MessageService]
})

export class ElencoAreeComponent implements OnInit{

  constructor(private areaService: AreaService, private router:Router, private message: MessageService, 
    private confirmationService: ConfirmationService) { }

  @ViewChild(Paginator) paginator!: Paginator;
  
  elencoAree: AreaModel[] = [];

  cols: Column[] = [
      { field: 'codice', header: 'Codice' },
      { field: 'area', header: 'Area' },
      { field: 'edit', header: '' },
      { field: 'delete', header: '' }
    ];


  pageIndex: number = 0;
  pageSize: number = 3;
  totRows: number = 0;

  
  ngOnInit(): void {
    this.recuperaElenco();
  }

  recuperaElenco() {
    this.areaService.getPage(this.pageIndex, this.pageSize).subscribe(
      (risposta: any) => {
        if(risposta.totalElements === 0 ){
          this.message.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
        }
        this.elencoAree = risposta.content;
        this.totRows = risposta.totalElements;

        if(localStorage.getItem('condizione') === 'aggiunta'){
          this.message.add(
            {severity: 'success', summary: 'Eseguita', detail: 'Area aggiunta con successo'}
          )
        } else if(localStorage.getItem('condizione') === 'modificata'){
          this.message.add(
            {severity: 'success', summary: 'Eseguita', detail: 'Area modificata con successo'}
          )
        }
        localStorage.removeItem('condizione');
      }
    )
  }

  onPageChange(event: PaginatorState){
    if (event.rows !== undefined) {
      this.pageSize = event.rows;
    }
    if (event.first !== undefined) {
      this.pageIndex = event.first / this.pageSize;
    }
    this.areaService.getPage(this.pageIndex, this.pageSize).subscribe((risposta: any) => {
      this.elencoAree = risposta.content;
      this.totRows = risposta.totalElements;
    });
  }

  checkDelete(id: number){
    this.areaService.checkElimina(id).subscribe(
      (risposta: Boolean) => {
        if(risposta){
          this.deleteArea(id);
        }else{
          this.message.add(
            {severity: 'error', summary: 'Attenzione', detail: 'Area non eliminabile'}
          )
        }
      }
    )
  }

  deleteArea(id: number){


    this.confirmationService.confirm({
      message: 'Sei sicuro di voler procedere?',
      header: 'Attenzione',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.areaService.elimina(id).subscribe(
          () => {
            this.message.add(
              {severity: 'success', summary: 'Eliminata', detail: 'Area eliminata con successo'}
            )
            this.recuperaElenco();
          }
        )
      },
      reject: (type: ConfirmEventType) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.message.add({ severity: 'error', summary: 'Annullata', detail: 'Area non eliminata' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.message.add({ severity: 'warn', summary: 'Annullata', detail: 'Operazione annullata' });
                  break;
          }
      }
  });






    
  }



}
