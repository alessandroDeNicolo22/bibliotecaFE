// import { Component } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
// import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
// import { PaginatorState } from 'primeng/paginator';
// import { FornitoreService } from 'src/app/archivi/genere/genere.service';
// import { FornitoreModel } from 'src/app/shared/model/genere.model';
// import { OrdineAcquistoModel } from 'src/app/shared/model/ordineacquisto.model';
// import { OrdineAcquistoDettaglioModel } from 'src/app/shared/model/ordinedettaglio.model';
// import { OrdineAcquistoService } from '../ordineacquisto.service';
// import { ProgettoService } from 'src/app/archivi/progetto/progetto.service';
// import { SottocategoriaService } from 'src/app/archivi/sottocategoria/sottocategoria.service';
// import { ProgettoModel } from 'src/app/shared/model/progetto-model';
// import { SottocategoriaModel } from 'src/app/shared/model/sottocategoria.model';
// import { DatePipe } from '@angular/common';

// @Component({
//   selector: 'app-ricerca-ordini',
//   templateUrl: './ricerca-ordini.component.html',
//   styleUrls: ['./ricerca-ordini.component.scss'],
//   providers: [ConfirmationService, MessageService, DialogService, DatePipe]
// })
// export class RicercaOrdiniComponent {
//   constructor(private service: OrdineAcquistoService,
//     private messageService: MessageService,
//     public dialogService: DialogService,
//     public fornitoreService: FornitoreService,
//     private progettoService: ProgettoService,
//     private sottoCService: SottocategoriaService,
//     private confirmationService: ConfirmationService,
//     private datePipe: DatePipe) { }
//   types: any[] = ['Nessun Filtro', 'Fornitore', 'Sottocategoria', 'Progetto']
//   ref: DynamicDialogRef | undefined;
//   formNuovo!: FormGroup;
//   elencoFornitore!: FornitoreModel[];
//   elencoProgetti!: ProgettoModel[];
//   elencoSottocategoria!: SottocategoriaModel[];
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
//       tipo: new FormControl("", [Validators.required]),
//       rangeDates: new FormControl(null, [Validators.required]),
//       id: new FormControl(0, [Validators.required])
//     });
//     this.fornitoreService.getLista().subscribe((elenco: FornitoreModel[]) => {
//       this.elencoFornitore = elenco;
//     });
//     this.sottoCService.getLista().subscribe((elenco: SottocategoriaModel[]) => {
//       this.elencoSottocategoria = elenco;
//     })
//     this.progettoService.getLista().subscribe((elenco: ProgettoModel[]) => {
//       this.elencoProgetti = elenco;
//     })
//   }

//   submitForm() {
//     if (this.formNuovo.value.tipo === 'Nessun Filtro') {
//       let primaData = this.datePipe.transform(this.formNuovo.value.rangeDates[0], "yyyy-MM-dd");
//       let secondaData = this.datePipe.transform(this.formNuovo.value.rangeDates[1], "yyyy-MM-dd");
//       const object: any = {
//         startDate: primaData,
//         endDate: secondaData,
//         type: "",
//         id: 0
//       }
//       if (secondaData !== null) {
//         this.service.getFilterData(object, this.pageIndex, this.pageSize).subscribe(
//           (risposta: any) => {
//             this.elenco = risposta.content;
//             this.totRows = risposta.totalElements;
//           }
//         )
//       }
//     } else {
//       if(this.formNuovo.value.rangeDates !== null){
//       let primaData = this.datePipe.transform(this.formNuovo.value.rangeDates[0], "yyyy-MM-dd");
//       let secondaData = this.datePipe.transform(this.formNuovo.value.rangeDates[1], "yyyy-MM-dd");
//       const object: any = {
//         startDate: primaData,
//         endDate: secondaData,
//         type: this.formNuovo.controls['tipo'].value,
//         id: this.formNuovo.controls['id'].value
//       }
//       if (secondaData !== null) {
//         this.service.getFilter(object, this.pageIndex, this.pageSize).subscribe(
//           (risposta: any) => {
//             this.elenco = risposta.content;
//             this.totRows = risposta.totalElements;
//             console.log(this.elenco)
//           }
//         )
//       }
//     }
//     }
//   }

//   onPageChange(event: PaginatorState) {
//     if (event.rows !== undefined) {
//       this.pageSize = event.rows;
//     }
//     if (event.first !== undefined) {
//       this.pageIndex = event.first / this.pageSize;
//     }
//     this.submitForm();
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
