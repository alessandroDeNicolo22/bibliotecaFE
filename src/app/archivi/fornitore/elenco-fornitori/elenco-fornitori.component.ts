import { Component, ViewChild } from '@angular/core';
import { FornitoreModel } from 'src/app/shared/model/fornitore.model';
import { FornitoreService } from '../fornitore.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { Table } from 'primeng/table';
interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-elenco-fornitori',
  templateUrl: './elenco-fornitori.component.html',
  styleUrls: ['./elenco-fornitori.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ElencoFornitoriComponent {
  @ViewChild('dt1') dt1!: Table;
  
  elenco!: FornitoreModel[];
  pageIndex: number = 0;
  pageSize: number = 3;
  totRows !: number;
  searchKeyword: string = '';
  cols: Column[] = [
    { field: 'ragioneSociale', header: 'Ragione Sociale' },
    { field: 'indirizzo', header: 'Indirizzo' },
    { field: 'citta', header: 'Città' },
    { field: 'cap', header: 'Cap' },
    { field: 'provincia', header: 'Provincia' },
    { field: 'partitaIva', header: 'Partita Iva' },
    { field: 'edit', header: '' },
    { field: 'delete', header: '' }
  ];

  constructor(private service: FornitoreService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.recuperaElenco();
  }
  
  recuperaElenco() {

    this.service.getPage(this.pageIndex, this.pageSize).subscribe(
      (risposta: any) => {
        if(risposta.totalElements === 0 ){
          this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
        }
        this.elenco = risposta.content;
        this.totRows = risposta.totalElements;
        if (localStorage.getItem('fornitore') === 'ok') {
          this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Fornitore aggiunto con successo!' });
          localStorage.removeItem('fornitore');
        } else if (localStorage.getItem('fornitore') === "1") {
          this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Fornitore modificato con successo!' });
          localStorage.removeItem('fornitore')
        }
      }
    )
  }



  deleteFornitore(id: number) {
    this.service.checkElimina(id).subscribe(
      (condizione) => {
        if (condizione === true) {
          this.confirmationService.confirm({
            message: 'Sei sicuro di eliminare questo Fornitore?',
            header: 'Conferma Eliminazione',
            icon: 'pi pi-info-circle',
            accept: () => {
              this.service.elimina(id).subscribe(
                () => {
                  if (this.elenco.length === 1) {
                    this.pageIndex--;
                  }
                  this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Fornitore eliminato con successo!' });
                  this.recuperaElenco();
                })

            },
            reject: (type: ConfirmEventType) => {
              switch (type) {
                case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Fornitore non eliminato!' });
                  break;
                case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Richiesta cancellata!' });
                  break;
              }
            }
          });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Non eliminabile', detail: 'Fornitore non eliminabile!' });
        }
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
    this.service.getPage(this.pageIndex, this.pageSize).subscribe((risposta: any) => {
      this.elenco = risposta.content;
      this.totRows = risposta.totalElements;
    });
  }
}

