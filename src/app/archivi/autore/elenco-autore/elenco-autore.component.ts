import { Component } from '@angular/core';
import { AutoreModel } from 'src/app/shared/model/autore-model';
import { AutoreService } from '../autore.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-elenco-autore',
  templateUrl: './elenco-autore.component.html',
  styleUrls: ['./elenco-autore.component.scss'],
  providers: [ConfirmationService, MessageService]
})



export class ElencoAutoreComponent {

  list!: AutoreModel[];
  pageIndex: number = 0;
  pageSize: number = 5;
  totRows !: number;

  cols: Column[] = [
    { field: 'nome', header: 'Nome' },
    { field: 'cognome', header: 'Cognome' },
    { field: 'edit', header: '' },
    { field: 'delete', header: '' }
  ];

  constructor(private service: AutoreService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.recuperaElenco();
  }

  recuperaElenco() {
    this.service.getPage(this.pageIndex, this.pageSize).subscribe(
      (response: any) => {
        if(response.totalElements === 0 ){
          this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
        }
        this.list = response.content;
        this.totRows = response.totalElements;
        if (localStorage.getItem('autore') === 'ok') {
          this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Autore aggiunto con successo!' });
          localStorage.removeItem('autore');
        }else if (localStorage.getItem('autore') === "1") {
      this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Autore modificato con successo!' });
      localStorage.removeItem('autore')
    }
      }
    )
   } 
   
  

  deleteAliquota(id: number,nome:string, cognome:string) {
    this.service.checkDelete(id).subscribe(
      (bool) => {
        if (bool) {
          this.confirmationService.confirm({
            message: 'Sei sicuro di eliminare ' + nome + ' ' + cognome +'?',
            header: 'Conferma eliminazione',
            icon: 'pi pi-info-circle',
            accept: () => {
              this.service.delete(id).subscribe(
                () => {
                  if (this.list.length === 1) {
                    this.pageIndex--;
                  }
                  this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Autore eliminata con successo!' });
                  this.recuperaElenco();
                })

            },
            reject: (type: ConfirmEventType) => {
              switch (type) {
                case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Autore non eliminato!' });
                  break;
                case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Richiesta cancellata!' });
                  break;
              }
            }
          });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Non eliminabile', detail: 'Autore non eliminabile!' });
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
    this.service.getPage(this.pageIndex, this.pageSize).subscribe((response: any) => {
      this.list = response.content;
      this.totRows = response.totalElements;
    });
  }

}

