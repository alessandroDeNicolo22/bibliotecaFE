
import { Component } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { UtenteModel } from 'src/app/shared/model/utente.model';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-elenco-utenti',
  templateUrl: './elenco-utenti.component.html',
  styleUrls: ['./elenco-utenti.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ElencoUtentiComponent {

  constructor(private service: AuthenticationService, private messageService: MessageService, private router: Router, private confirmationService: ConfirmationService) { }

  pageIndex: number = 0;
  pageSize: number = 3;
  totRows !: number;
  elenco!: UtenteModel[];

  ngOnInit(): void {
    if(this.service.isAdmin()){
    this.recuperaElenco();
    }else{
      localStorage.setItem('nopermessi','2');
      this.router.navigate(['']);
    }
  }

  recuperaElenco(){
    this.service.getPage(this.pageIndex, this.pageSize).subscribe(
      (risposta: any) => {
        if (risposta.totalElements === 0) {
          this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
        }
        this.elenco = risposta.content;
        this.totRows = risposta.totalElements;
        
      }
    )
  }

  update(id: number) {
    localStorage.setItem('modifica', id.toString())
    this.router.navigate(['utente/modifica'])
  }
  deleteUtente(id: number) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler procedere?',
      header: 'Attenzione',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.elimina(id).subscribe(
          () => {
            if (this.elenco.length === 1 && this.pageIndex !== 0) {
              this.pageIndex--;
            }
            this.messageService.add(
              { severity: 'success', summary: 'Eliminata', detail: 'Utente eliminato con successo' }
            )
            this.recuperaElenco();
          }
        )
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Annullata', detail: 'Utente non eliminato' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Annullata', detail: 'Operazione annullata' });
            break;
        }
      }
    });
  }

  
  onPageChange(event: PaginatorState) {
    if (event.rows !== undefined) {
      this.pageSize = event.rows;
    }
    if (event.first !== undefined) {
      this.pageIndex = event.first / this.pageSize;
    }
    console.log(this.pageIndex, this.pageSize);
    this.service.getPage(this.pageIndex, this.pageSize).subscribe(
      (risposta: any) => {
        this.elenco = risposta.content;
        this.totRows = risposta.totalElements;
      }
    )
  }
}
