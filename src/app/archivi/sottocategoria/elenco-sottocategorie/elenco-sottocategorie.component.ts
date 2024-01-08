import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { SottocategoriaModel } from 'src/app/shared/model/sottocategoria.model';
import { SottocategoriaService } from '../sottocategoria.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-elenco-sottocategorie',
  templateUrl: './elenco-sottocategorie.component.html',
  styleUrls: ['./elenco-sottocategorie.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ElencoSottocategorieComponent {
  @ViewChild('dt1') dt1!: Table;

  elenco!: SottocategoriaModel[];
  pageIndex: number = 0;
  pageSize: number = 3;
  totRows !: number;
  searchKeyword: string = '';


  cols: Column[] = [
    { field: 'codice', header: 'Codice' },
    { field: 'sottocategoria', header: 'Sottocategoria' },
    { field: 'oArea', header: 'Area' },
    { field: 'budget', header: 'Budget' },
    { field: 'edit', header: '' },
    { field: 'delete', header: '' }
  ];

  constructor(private service: SottocategoriaService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

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
        if (localStorage.getItem('sottocategoria') === 'ok') {
          this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Sottocategoria aggiunta con successo!' });
          localStorage.removeItem('sottocategoria');
        } else if (localStorage.getItem('sottocategoria') === "1") {
          this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Sottocategoria modificata con successo!' });
          localStorage.removeItem('Sottocategoria')
        }
      }
    )
  }



  deleteSottocategoria(id: number) {
    this.service.checkElimina(id).subscribe(
      (condizione) => {
        if (condizione === true) {
          this.confirmationService.confirm({
            message: 'Sei sicuro di eliminare questa Sottocategoria?',
            header: 'Conferma Eliminazione',
            icon: 'pi pi-info-circle',
            accept: () => {
              this.service.elimina(id).subscribe(
                () => {
                  if (this.elenco.length === 1) {
                    this.pageIndex--;
                  }
                  this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Sottocategoria eliminata con successo!' });
                  this.recuperaElenco();
                })

            },
            reject: (type: ConfirmEventType) => {
              switch (type) {
                case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Sottocategoria non eliminata!' });
                  break;
                case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Richiesta cancellata!' });
                  break;
              }
            }
          });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Non eliminabile', detail: 'Sottocategoria non eliminabile!' });
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

