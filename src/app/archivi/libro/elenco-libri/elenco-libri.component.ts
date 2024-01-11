import { Component } from '@angular/core';
import { LibroService } from '../libro.service';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { LibroModel } from 'src/app/shared/model/libro.model';
import { PaginatorState } from 'primeng/paginator';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-elenco-libri',
  templateUrl: './elenco-libri.component.html',
  styleUrls: ['./elenco-libri.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ElencoLibriComponent {

  constructor(private service: LibroService, private router: Router, private message: MessageService, private confirmationService: ConfirmationService) { }

  list!: LibroModel[];

  cols: Column[] = [
    { field: 'oAutore', header: 'Autore' },
    { field: 'oGenere', header: 'Genere' },
    { field: 'oCasaeditrice', header: 'Casa Editrice' },
    { field: 'titolo', header: 'Titolo' },
    { field: 'edit', header: '' },
    { field: 'delete', header: '' }
  ];

  pageIndex: number = 0;
  pageSize: number = 5;
  totRows: number = 0;


  ngOnInit(): void {
    this.recuperaElenco();
  }

  recuperaElenco() {
    this.service.getPage(this.pageIndex, this.pageSize).subscribe(
      (response: any) => {
        if (response.totalElements === 0) {
          this.message.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
        }
        this.list = response.content;
        this.totRows = response.totalElements;

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
    this.service.getPage(this.pageIndex, this.pageSize).subscribe((response: any) => {
      this.list = response.content;
      this.totRows = response.totalElements;
    });
  }

  delete(id: number, titolo: string) {
    this.service.checkDelete(id).subscribe(
      (response: Boolean) => {
        if (response) {
          this.confirmationService.confirm({
            message: 'Sei sicuro di voler eliminare il Libro:' + titolo + '?',
            header: 'Attenzione',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.service.delete(id).subscribe(
                () => {
                  this.message.add(
                    { severity: 'success', summary: 'Eliminato', detail: 'Libro eliminato con successo' }
                  )
                  this.recuperaElenco();
                }
              )
            },
            reject: (type: ConfirmEventType) => {
              switch (type) {
                case ConfirmEventType.REJECT:
                  this.message.add({ severity: 'error', summary: 'Annullato', detail: 'Libro non eliminato' });
                  break;
                case ConfirmEventType.CANCEL:
                  this.message.add({ severity: 'warn', summary: 'Annullato', detail: 'Richiesta cancellata' });
                  break;
              }
            }
          })
        } else {
          this.message.add(
            { severity: 'error', summary: 'Attenzione', detail: 'Libro non eliminabile' }
          )
        }
      }
    )
  }
}
