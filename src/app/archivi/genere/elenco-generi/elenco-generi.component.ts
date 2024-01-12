import { Component, ViewChild } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { GenereModel } from 'src/app/shared/model/genere.model';
import { GenereService } from '../genere.service';
interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-elenco-generi',
  templateUrl: './elenco-generi.component.html',
  styleUrls: ['./elenco-generi.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ElencoGeneriComponent {
  @ViewChild('dt1') dt1!: Table;
  
  elenco!: GenereModel[];
  pageIndex: number = 0;
  pageSize: number = 3;
  totRows !: number;
  searchKeyword: string = '';
  cols: Column[] = [
    { field: 'nome', header: 'Nome' },
    { field: 'edit', header: '' },
    { field: 'delete', header: '' }
  ];

  constructor(private service: GenereService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

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
        if (localStorage.getItem('genere') === 'ok') {
          this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Genere aggiunto con successo!' });
          localStorage.removeItem('genere');
        } else if (localStorage.getItem('genere') === "1") {
          this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Genere modificato con successo!' });
          localStorage.removeItem('genere')
        }
      }
    )
  }



  deleteGenere(id: number) {
    this.service.checkElimina(id).subscribe(
      (condizione) => {
        if (condizione === true) {
          this.confirmationService.confirm({
            message: 'Sei sicuro di eliminare questo genere?',
            header: 'Conferma Eliminazione',
            icon: 'pi pi-info-circle',
            accept: () => {
              this.service.elimina(id).subscribe(
                () => {
                  if (this.elenco.length === 1) {
                    this.pageIndex--;
                  }
                  this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Genere eliminato con successo!' });
                  this.recuperaElenco();
                })

            },
            reject: (type: ConfirmEventType) => {
              switch (type) {
                case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Genere non eliminato!' });
                  break;
                case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Richiesta cancellata!' });
                  break;
              }
            }
          });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Non eliminabile', detail: 'Genere non eliminabile!' });
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

