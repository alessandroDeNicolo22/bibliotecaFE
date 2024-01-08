import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ProgettoService } from '../progetto.service';
import { Router } from '@angular/router';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { ProgettoModel } from 'src/app/shared/model/progetto-model';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-elenco-progetti',
  templateUrl: './elenco-progetti.component.html',
  styleUrls: ['./elenco-progetti.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ElencoProgettiComponent implements OnInit {

  constructor(private progettoService: ProgettoService, private router: Router, private message: MessageService,
    private confirmationService: ConfirmationService) { }

  @ViewChild(Paginator) paginator!: Paginator;

  elencoProgetti: ProgettoModel[] = [];

  cols: Column[] = [
    { field: 'codice', header: 'Codice' },
    { field: 'progetto', header: 'Progetto' },
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
    this.progettoService.getPage(this.pageIndex, this.pageSize).subscribe(
      (risposta: any) => {
        if(risposta.totalElements === 0 ){
          this.message.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
        }
        this.elencoProgetti = risposta.content;
        this.totRows = risposta.totalElements;

        if (localStorage.getItem('condizione') === 'aggiunto') {
          this.message.add(
            { severity: 'success', summary: 'Eseguita', detail: 'Progetto aggiunto con successo' }
          )
        } else if (localStorage.getItem('condizione') === 'modificato') {
          this.message.add(
            { severity: 'success', summary: 'Eseguita', detail: 'Progetto modificato con successo' }
          )
        }
        localStorage.removeItem('condizione');
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
    this.progettoService.getPage(this.pageIndex, this.pageSize).subscribe((risposta: any) => {
      this.elencoProgetti = risposta.content;
      this.totRows = risposta.totalElements;
    });
  }

  checkDelete(id: number) {
    this.progettoService.checkElimina(id).subscribe(
      (risposta: Boolean) => {
        if (risposta) {
          this.deleteProgetto(id);
        } else {
          this.message.add(
            { severity: 'error', summary: 'Attenzione', detail: 'Progetto non eliminabile' }
          )
        }
      }
    )
  }

  deleteProgetto(id: number) {


    this.confirmationService.confirm({
      message: 'Sei sicuro di voler procedere?',
      header: 'Attenzione',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.progettoService.elimina(id).subscribe(
          () => {
            this.message.add(
              { severity: 'success', summary: 'Eliminata', detail: 'Progetto eliminato con successo' }
            )
            this.recuperaElenco();
          }
        )
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.message.add({ severity: 'error', summary: 'Annullata', detail: 'Progetto non eliminato' });
            break;
          case ConfirmEventType.CANCEL:
            this.message.add({ severity: 'warn', summary: 'Annullata', detail: 'Operazione annullata' });
            break;
        }
      }
    });

  }
}
