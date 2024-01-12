// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { FornitoreService } from 'src/app/archivi/fornitore/genere.service';
// import { FornitoreModel } from 'src/app/shared/model/genere.model';
// import { PreventivoModel } from 'src/app/shared/model/preventivo-model';
// import { PreventivoService } from '../preventivo.service';
// import { Paginator, PaginatorState } from 'primeng/paginator';
// import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

// interface Column {
//   field: string;
//   header: string;
// }

// @Component({
//   selector: 'app-gestione-preventivi',
//   templateUrl: './gestione-preventivi.component.html',
//   styleUrls: ['./gestione-preventivi.component.scss'],
//   providers: [ConfirmationService, MessageService]
// })
// export class GestionePreventiviComponent implements OnInit {

//   constructor(private preventivoService: PreventivoService, 
//     private messageService: MessageService, private confirmationService: ConfirmationService, private message: MessageService) { }

//   @ViewChild('myPaginator') paginator!: Paginator;

//   formScelta!: FormGroup;

//   fornitori: FornitoreModel[] = [];
//   numeri: number[] = [];
//   elencoPreventivi: PreventivoModel[] = [];

//   cols: Column[] = [
//     { field: 'codice', header: 'Codice' },
//     { field: 'preventivo', header: 'Preventivo' },
//     { field: 'importo', header: 'Importo' },
//     { field: 'data', header: 'Data' },
//     { field: 'edit', header: '' },
//     { field: 'delete', header: '' }
//   ];

//   pageIndex: number = 0;
//   pageSize: number = 3;
//   totRows: number = 0;


//   ngOnInit(): void {

//     this.formScelta = new FormGroup({
//       selezione: new FormControl('', Validators.required)
//     })

//     this.fornitoreService.getLista().subscribe(
//       (risposta: FornitoreModel[]) => {
//         this.fornitori = risposta;

//         if (localStorage.getItem('condizione') === 'aggiunto') {
//           this.messageService.add({ severity: 'success', summary: 'Eseguito', detail: 'Preventivo aggiunto correttamente' })
//           localStorage.removeItem('condizione');
//         }else if(localStorage.getItem('condizione') === 'modificato'){
//           this.messageService.add({ severity: 'success', summary: 'Eseguito', detail: 'Preventivo modificato correttamente' })
//           localStorage.removeItem('condizione');
//         }
//       }
//     )

//     const idFornitoreScelto = localStorage.getItem('idFornitoreScelto');
//     if (idFornitoreScelto !== null) {

//       this.formScelta.controls['selezione'].setValue(parseInt(idFornitoreScelto))

//       this.preventivoService.getPage(parseInt(idFornitoreScelto), this.pageIndex, this.pageSize).subscribe(
//         (risposta: any) => {
//           if(risposta.totalElements === 0 ){
//             this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
//           }
//           this.elencoPreventivi = risposta.content;
//           this.totRows = risposta.totalElements;
//         }
//       )
//     }

//     localStorage.removeItem('idFornitoreScelto');



//   }


//   recuperaElencoPreventivi(idFornitore: number) {
//     localStorage.setItem('idFornitoreScelto', idFornitore.toString())
//     this.preventivoService.getPage(idFornitore, this.pageIndex, this.pageSize).subscribe(
//       (risposta: any) => {
//         if(risposta.totalElements === 0 ){
//           this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
//         }
//         this.elencoPreventivi = risposta.content;
//         this.totRows = risposta.totalElements;
//       }
//     )
//   }

//   checkDelete(id: number) {
//     this.preventivoService.checkDelete(id).subscribe(
//       (risposta: Boolean) => {
//         if(risposta){
//           this.delete(id);
//         }else{
//           this.messageService.add({severity: 'error', summary: 'Attenzione', detail: 'Preventivo non eliminabile'})
//         }
//       }
//     )
//   }

//   delete(id: number){
//     this.confirmationService.confirm({
//       message: 'Sei sicuro di voler procedere?',
//       header: 'Attenzione',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//         this.preventivoService.delete(id).subscribe(
//           () => {
//             this.message.add(
//               {severity: 'success', summary: 'Eliminata', detail: 'Area eliminata con successo'}
//             )

//             if(this.elencoPreventivi.length === 1){
//               this.pageIndex--;
//             }
            

//             const idFornitoreScelto = localStorage.getItem('idFornitoreScelto');

//             if(idFornitoreScelto !== null){
//               this.preventivoService.getPage(parseInt(idFornitoreScelto), this.pageIndex, this.pageSize).subscribe(
//                 (risposta: any) => {
//                   this.elencoPreventivi = risposta.content;
//                   this.totRows = risposta.totalElements;
//                 }
//               )
//             }



//           }
//         )
//       },
//       reject: (type: ConfirmEventType) => {
//           switch (type) {
//               case ConfirmEventType.REJECT:
//                   this.message.add({ severity: 'error', summary: 'Annullata', detail: 'Area non eliminata' });
//                   break;
//               case ConfirmEventType.CANCEL:
//                   this.message.add({ severity: 'warn', summary: 'Annullata', detail: 'Operazione annullata' });
//                   break;
//           }
//       }
//   });
//   }

//   onPageChange(event: PaginatorState) {
//     if (event.rows !== undefined) {
//       this.pageSize = event.rows;
//     }
//     if (event.first !== undefined) {
//       this.pageIndex = event.first / this.pageSize;
//     }
//     7
//     const idFornitoreScelto = localStorage.getItem('idFornitoreScelto');
//     if (idFornitoreScelto !== null) {
//       this.preventivoService.getPage(parseInt(idFornitoreScelto), this.pageIndex, this.pageSize).subscribe((risposta: any) => {
//         this.elencoPreventivi = risposta.content;
//         this.totRows = risposta.totalElements;
//         console.log(risposta)
//       });
//     }



//   }

// }
