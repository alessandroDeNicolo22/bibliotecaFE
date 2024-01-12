// import { Component } from '@angular/core';
// import { OrdineAcquistoService } from '../ordineacquisto.service';
// import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
// import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { FornitoreModel } from 'src/app/shared/model/genere.model';
// import { OrdineAcquistoModel } from 'src/app/shared/model/ordineacquisto.model';
// import { FornitoreService } from 'src/app/archivi/genere/genere.service';
// import { PaginatorState } from 'primeng/paginator';
// import { OrdineAcquistoDettaglioModel } from 'src/app/shared/model/ordinedettaglio.model';

// @Component({
//   selector: 'app-gestione-ordini',
//   templateUrl: './gestione-ordini.component.html',
//   styleUrls: ['./gestione-ordini.component.scss'],
//   providers: [ConfirmationService, MessageService, DialogService]
// })
// export class GestioneOrdiniComponent {
//   constructor(private service: OrdineAcquistoService,
//     private messageService: MessageService,
//     public dialogService: DialogService,
//     public fornitoreService: FornitoreService,
//     private confirmationService: ConfirmationService) { }
  
//     ref: DynamicDialogRef | undefined;
//   formNuovo!: FormGroup;
//   elencoFornitore!: FornitoreModel[];
//   pageIndex: number = 0;
//   pageSize: number = 3;
//   totRows !: number;
//   totRowsd!: number;
//   pageIndexd: number = 0;
//   pageSized: number = 3;
//   elenco!: OrdineAcquistoModel[];
//   visible: boolean = false;
//   dettagli!: OrdineAcquistoDettaglioModel[];
//   idDettaglio!: number;

//   ngOnInit(): void {
    
//     this.formNuovo = new FormGroup({
//       oFornitore: new FormControl(null, [Validators.required]),
//     });
//     this.fornitoreService.getLista().subscribe((elenco: FornitoreModel[]) => {
//       this.elencoFornitore = elenco;
//     });
//     console.log(localStorage.getItem('fornitore'))
//     const fornitorIDString = localStorage.getItem('fornitore');
//     if (fornitorIDString !== null) {
//       const fornitorID = parseInt(fornitorIDString);
//       this.formNuovo.controls['oFornitore'].setValue(fornitorID);
//       this.submitForm();
//       localStorage.removeItem('fornitore')
//     } else {

//     }
//   }

//   submitForm() {
//     if (this.formNuovo.valid) {

//       this.service.getListaPerFornitore(this.formNuovo.value.oFornitore, this.pageIndex, this.pageSize).subscribe(
//         (risposta: any) => {
//           if(localStorage.getItem('message')){
//             this.messageService.add({ severity: 'success', summary: 'Attenzione', detail: 'Ordine e dettagli Aggiunti con successo!' });
//             localStorage.removeItem('message');
//           }
//           if(risposta.totalElements === 0 ){
//             this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
//           }
//           this.elenco = risposta.content;
//           this.totRows = risposta.totalElements; console.log(this.elenco)
//         }
//       )
//     } else {
//       this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
//     }
//   }

//   onPageChange(event: PaginatorState) {
//     if (event.rows !== undefined) {
//       this.pageSize = event.rows;
//     }
//     if (event.first !== undefined) {
//       this.pageIndex = event.first / this.pageSize;
//     }
//     console.log(this.pageIndex, this.pageSize);
//     this.service.getListaPerFornitore(this.formNuovo.value.oFornitore, this.pageIndex, this.pageSize).subscribe(
//       (risposta: any) => {
//         this.elenco = risposta.content;

//         this.totRows = risposta.totalElements;
//       }
//     )
//   }
//   deleteOrdine(id: number) {
//     this.confirmationService.confirm({
//       message: 'Sei sicuro di eliminare questo Ordine?',
//       header: 'Conferma Eliminazione',
//       icon: 'pi pi-info-circle',
//       accept: () => {
//         this.service.delete(id).subscribe(
//           () => {
//             if (this.elenco.length === 1 && this.pageIndex !== 0) {  
//               this.pageIndex--;
//             }
//             this.messageService.add({ severity: 'success', summary: 'Confermato', detail: 'Ordine e dettagli eliminati con successo!' });
//             this.submitForm();
//           })

//       },
//       reject: (type: ConfirmEventType) => {
//         switch (type) {
//           case ConfirmEventType.REJECT:
//             this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Ordine non eliminato!' });
//             break;
//           case ConfirmEventType.CANCEL:
//             this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Richiesta cancellata!' });
//             break;
//         }
//       }
//     });
//   }
//   openDetails(id: number) {
//     this.visible = true;
//     this.idDettaglio = id;
//     this.service.getDettagli(id, this.pageIndexd, this.pageSized).subscribe((risposta: any) => {
//       console.log("ok")
//       this.dettagli = risposta.content;
//       this.totRowsd = risposta.totalElements;
//     })
//   }
//   onPageChange1(event: PaginatorState) {
//     if (event.rows !== undefined) {
//       this.pageSized = event.rows;
//     }
//     if (event.first !== undefined) {
//       this.pageIndexd = event.first / this.pageSized;
//     }
//     console.log(this.pageIndexd, this.pageSized);
//     this.service.getDettagli(this.idDettaglio, this.pageIndexd, this.pageSized).subscribe(
//       (risposta: any) => {
//         this.dettagli = risposta.content;
//         this.totRows = risposta.totalElements;
//       }
//     )
//   }
// }

