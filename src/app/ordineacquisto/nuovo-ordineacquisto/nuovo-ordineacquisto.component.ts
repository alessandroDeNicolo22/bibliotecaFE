import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FornitoreModel } from 'src/app/shared/model/fornitore.model';
import { OrdineAcquistoService } from '../ordineacquisto.service';
import { FornitoreService } from 'src/app/archivi/fornitore/fornitore.service';
import { OrdineAcquistoModel } from 'src/app/shared/model/ordineacquisto.model';
import { ProgettoService } from 'src/app/archivi/progetto/progetto.service';
import { SpesaInvestimentoService } from 'src/app/budget/spesainvestimento/spesainvestimento.service';
import { ProgettoModel } from 'src/app/shared/model/progetto-model';
import { SpesaInvestimentoModel } from 'src/app/shared/model/spesainvestimento.model';
import { OrdineAcquistoDettaglioModel } from 'src/app/shared/model/ordinedettaglio.model';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-nuovo-ordineacquisto',
  templateUrl: './nuovo-ordineacquisto.component.html',
  styleUrls: ['./nuovo-ordineacquisto.component.scss'],
  providers: [ConfirmationService, MessageService]

})
export class NuovoOrdineacquistoComponent {
  constructor(private service: OrdineAcquistoService,
    private router: Router,
    private messageService: MessageService,
    private fornService: FornitoreService,
    private proService: ProgettoService,
    private spesaService: SpesaInvestimentoService) { }

  formNuovo!: FormGroup;
  elencoFornitori!: FornitoreModel[];
  elencoProgetti!: ProgettoModel[];
  elencoSpese!: SpesaInvestimentoModel[];
  formDettaglio!: FormGroup;
  dettagli:any[]=[];
  dettTransienti:any[]=[];
  visible: boolean = false;
  visible1: boolean = false;
  totRowsd!: number;
  pageIndexd: number = 0;
  pageSized: number = 3;
  nImporto:number = 0;
  visible2: boolean = false;
  index: number = 0;
  ordineAcquisto:any = {
    id:0,
    data:"",
    importo:0,
    ordineacquisto:"",
    oFornitore:null,
  }

  ngOnInit(): void {
    this.formNuovo = new FormGroup({
      importo: new FormControl(0, [Validators.required]),
      ordineacquisto: new FormControl('', [Validators.required]),
      data: new FormControl(null, [Validators.required]),
      oFornitore: new FormControl(null, [Validators.required]),
    })
    this.formDettaglio = new FormGroup({
      ordineAcquisto: new FormControl(null),
      oSpesaInvestimento: new FormControl(0, [Validators.required]),
      oProgetto: new FormControl('', [Validators.required]),
      importo: new FormControl(0, [Validators.required]),
      quantita: new FormControl(0, [Validators.required]),
    })
    this.formNuovo.controls['importo'].disable();
    this.fornService.getLista().subscribe((elenco: FornitoreModel[]) => {
      this.elencoFornitori = elenco;
    })
    this.proService.getLista().subscribe((elenco: ProgettoModel[]) => {
      this.elencoProgetti = elenco;
    })
    this.spesaService.getLista().subscribe((elenco: SpesaInvestimentoModel[]) => {
      this.elencoSpese = elenco;
    })
  }


  submitForm() {
    if(this.formNuovo.controls['importo']?.value === undefined){
        this.nImporto = 0;
      }else{
        this.nImporto = this.formNuovo.controls['importo']?.value;
      }
    const ordineAcquisto: OrdineAcquistoModel = {  
      id:0,
      importo: this.nImporto,
      ordineacquisto: this.formNuovo.controls['ordineacquisto'].value,
      data: this.formNuovo.controls['data'].value,
      oFornitore: this.formNuovo.controls['oFornitore'].value,
    }
    console.log(ordineAcquisto)
    if (this.formNuovo.valid) {
      this.service.save(ordineAcquisto).subscribe(
        () => {
          if(this.dettagli!.length !== 0){
            this.service.saveDettagli(this.dettagli).subscribe(()=>{
              
            });
          }
          this.router.navigate(['ordineacquisto/gestione'])
          localStorage.setItem('fornitore', this.formNuovo.controls['oFornitore'].value.id)
          localStorage.setItem('message', '1');
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
    
  }

  addDetail() {
    const dettaglio: any = {
      oOrdineAcquisto: this.ordineAcquisto,
      oProgetto: this.formDettaglio.value.oProgetto,
      oSpesaInvestimento: this.formDettaglio.value.oSpesaInvestimento,
      importo: this.formDettaglio.value.importo,
      quantita: this.formDettaglio.value.quantita
    }
    if(this.formDettaglio.valid){
    this.dettagli!.push(dettaglio);
    this.totRowsd = this.dettagli.length;
    console.log(this.totRowsd)
    this.formDettaglio.reset();
    const totalImporto = this.dettagli.reduce((total, det) => total + det.importo * det.quantita, 0);
    this.formNuovo.patchValue({
      importo: totalImporto
    });
  }
  this.createPage()
    /*   reduce è un metodo degli array in JavaScript che consente di iterare attraverso gli elementi dell'array e accumulare un valore in base a una funzione di riduzione specificata.
    La funzione di riduzione accetta due argomenti: il "total" (l'accumulatore) e il "det" (l'elemento corrente nell'iterazione).
    total rappresenta il valore accumulato fino a quel punto, inizializzato con il valore 0.
    det rappresenta l'oggetto dettaglio corrente nell'iterazione. */
  }
  deleteDetail(index:number){
    const i = this.dettagli.indexOf(index);
    this.dettagli.splice(i,1);
    const totalImporto = this.dettagli.reduce((total, det) => total + det.importo * det.quantita, 0);
    this.formNuovo.patchValue({
      importo: totalImporto
    });
    this.totRowsd--;
    if(this.dettTransienti.length===1){
      this.pageIndexd--;
    }
    this.createPage()
  }
  createPage() {
    console.log(this.dettagli)
    const startPage = this.pageIndexd * this.pageSized;
    const endPage = startPage + this.pageSized;
    this.dettTransienti= this.dettagli.slice(startPage, endPage);

  }
  openDetails() {
    this.visible = true;
    this.createPage()
  }

  onPageChange1(event: PaginatorState) {
    if (event.rows !== undefined) {
      this.pageSized = event.rows;
    }
    if (event.first !== undefined) {
      this.pageIndexd = event.first / this.pageSized;
    }
    this.createPage()
  }

  annulla() {
    this.visible1 = false;
    this.visible2 = false;
  }
  openAddDetails() {
    this.visible1 = true;
  }
  updateDetail() {
    this.dettagli[this.index].importo = this.formDettaglio.controls['importo'].value;
    this.dettagli[this.index].quantita = this.formDettaglio.controls['quantita'].value;
    this.dettagli[this.index].oSpesaInvestimento = this.elencoSpese.find(spesa => spesa.id === this.formDettaglio.controls['oSpesaInvestimento'].value);
    this.dettagli[this.index].oProgetto = this.elencoProgetti.find(progetto => progetto.id === this.formDettaglio.controls['oProgetto'].value);
    const totalImporto = this.dettagli.reduce((total, det) => total + det.importo * det.quantita, 0);
    this.formNuovo.patchValue({
      importo: totalImporto
    });
    this.visible2 = false;
    this.formDettaglio.reset();
  }
  updateDetails(index: any) {
    this.visible2 = true;
    this.index = this.dettagli.indexOf(index);
    this.formDettaglio.controls['importo'].setValue(index.importo);
    this.formDettaglio.controls['quantita'].setValue(index.quantita);
    /* this.formDettaglio.controls['oOrdineAcquisto'].setValue(index.oOrdineAcquisto.id); */
    this.formDettaglio.controls['oSpesaInvestimento'].setValue(index.oSpesaInvestimento!.id),
    this.formDettaglio.controls['oProgetto'].setValue(index.oProgetto!.id);
  }
}

