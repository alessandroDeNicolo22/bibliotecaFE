import { Component } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { CasaEditriceModel } from 'src/app/shared/model/ce.model';
import { CasaEditriceService } from '../ce.service';
import { PaginatorState } from 'primeng/paginator';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-elenco-ce',
  templateUrl: './elenco-ce.component.html',
  styleUrls: ['./elenco-ce.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ElencoCeComponent {

  list!: CasaEditriceModel[];
  pageIndex: number = 0;
  pageSize: number = 5;
  totRows !: number;

  cols: Column[] = [
    { field: 'nome', header: 'Nome' },
    { field: 'edit', header: '' },
    { field: 'delete', header: '' }
  ];

  constructor(private service: CasaEditriceService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

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
        if (localStorage.getItem('casaeditrice') === 'ok') {
          this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Casa Editrice aggiunta con successo!' });
          localStorage.removeItem('casaeditrice');
        }else if (localStorage.getItem('casaeditrice') === "1") {
      this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Casa Editrice modificata con successo!' });
      localStorage.removeItem('casaeditrice')
    }
      }
    )
   } 
   
  

  deleteCE(id: number,nome:string) {
    this.service.checkDelete(id).subscribe(
      (bool) => {
        if (bool) {
          this.confirmationService.confirm({
            message: 'Sei sicuro di eliminare la Casa Editrice: ' + nome +'?',
            header: 'Conferma eliminazione',
            icon: 'pi pi-info-circle',
            accept: () => {
              this.service.delete(id).subscribe(
                () => {
                  if (this.list.length === 1) {
                    this.pageIndex--;
                  }
                  this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Casa Editrice eliminata con successo!' });
                  this.recuperaElenco();
                })

            },
            reject: (type: ConfirmEventType) => {
              switch (type) {
                case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Casa Editrice non eliminata!' });
                  break;
                case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Richiesta cancellata!' });
                  break;
              }
            }
          });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Non eliminabile', detail: 'Casa Editrice non eliminabile!' });
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
