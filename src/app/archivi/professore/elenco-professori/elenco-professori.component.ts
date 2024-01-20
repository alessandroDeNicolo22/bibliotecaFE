import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { ProfessoreService } from '../professore.service';
import { ProfessoreModel } from 'src/app/shared/model/professore-model';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-elenco-professori',
  templateUrl: './elenco-professori.component.html',
  styleUrls: ['./elenco-professori.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ElencoProfessoriComponent implements OnInit {

  constructor(private professoriService: ProfessoreService, private router: Router, private message: MessageService,
    private confirmationService: ConfirmationService) { }

  @ViewChild(Paginator) paginator!: Paginator;

  elencoProfessori: ProfessoreModel[] = [];

  cols: Column[] = [
    { field: 'cognome', header: 'Cognome' },
    { field: 'nome', header: 'Nome' },
    { field: 'matricola', header: 'Matricola' },
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
    this.professoriService.getPage(this.pageIndex, this.pageSize).subscribe(
      (risposta: any) => {
        if(risposta.totalElements === 0 ){
          this.message.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
        }
        this.elencoProfessori = risposta.content;
        this.totRows = risposta.totalElements;

        if (localStorage.getItem('condizione') === 'aggiunto') {
          this.message.add(
            { severity: 'success', summary: 'Eseguita', detail: 'Professore aggiunto con successo' }
          )
        } else if (localStorage.getItem('condizione') === 'modificato') {
          this.message.add(
            { severity: 'success', summary: 'Eseguita', detail: 'Professore modificato con successo' }
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
    this.professoriService.getPage(this.pageIndex, this.pageSize).subscribe((risposta: any) => {
      this.elencoProfessori = risposta.content;
      this.totRows = risposta.totalElements;
    });
  }

  checkDelete(id: number) {
    this.professoriService.checkElimina(id).subscribe(
      (risposta: Boolean) => {
        if (risposta) {
          this.deleteProfessore(id);
        } else {
          this.message.add(
            { severity: 'error', summary: 'Attenzione', detail: 'Professore non eliminabile' }
          )
        }
      }
    )
  }

  deleteProfessore(id: number) {


    this.confirmationService.confirm({
      message: 'Sei sicuro di voler procedere?',
      header: 'Attenzione',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.professoriService.elimina(id).subscribe(
          () => {
            this.message.add(
              { severity: 'success', summary: 'Eliminata', detail: 'Professore eliminato con successo' }
            )
            this.recuperaElenco();
          }
        )
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.message.add({ severity: 'error', summary: 'Annullata', detail: 'Professore non eliminato' });
            break;
          case ConfirmEventType.CANCEL:
            this.message.add({ severity: 'warn', summary: 'Annullata', detail: 'Operazione annullata' });
            break;
        }
      }
    });

  }
}
