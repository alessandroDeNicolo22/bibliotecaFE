import { Component } from '@angular/core';
import { AliquotaivaModel } from 'src/app/shared/model/aliquotaiva.model';
import { AliquotaService } from '../aliquota.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-elenco-aliquota',
  templateUrl: './elenco-aliquota.component.html',
  styleUrls: ['./elenco-aliquota.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ElencoAliquotaComponent {

  elenco!: AliquotaivaModel[];
  pageIndex: number = 0;
  pageSize: number = 3;
  totRows !: number;

  cols: Column[] = [
    { field: 'aliquota', header: 'Aliquota' },
    { field: 'descrizione', header: 'Descrizione' },
    { field: 'edit', header: '' },
    { field: 'delete', header: '' }
  ];

  constructor(private service: AliquotaService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

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
        if (localStorage.getItem('aliquota') === 'ok') {
          this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Aliquotaiva aggiunta con successo!' });
          localStorage.removeItem('aliquota');
        }else if (localStorage.getItem('aliquota') === "1") {
      this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Aliquotaiva modificata con successo!' });
      localStorage.removeItem('aliquota')
    }
      }
    )
   } 
   
  

  deleteAliquota(id: number) {
    this.service.checkElimina(id).subscribe(
      (condizione) => {
        if (condizione === true) {
          this.confirmationService.confirm({
            message: 'Sei sicuro di eliminare questa Aliquota?',
            header: 'Conferma Eliminazione',
            icon: 'pi pi-info-circle',
            accept: () => {
              this.service.elimina(id).subscribe(
                () => {
                  if (this.elenco.length === 1) {
                    this.pageIndex--;
                  }
                  this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Aliquotaiva eliminata con successo!' });
                  this.recuperaElenco();
                })

            },
            reject: (type: ConfirmEventType) => {
              switch (type) {
                case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Aliquotaiva non eliminata!' });
                  break;
                case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Richiesta cancellata!' });
                  break;
              }
            }
          });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Non eliminabile', detail: 'Aliquotaiva non eliminabile!' });
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

