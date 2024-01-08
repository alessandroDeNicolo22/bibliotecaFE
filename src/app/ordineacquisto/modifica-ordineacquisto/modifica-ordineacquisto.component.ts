import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { FornitoreService } from 'src/app/archivi/fornitore/fornitore.service';
import { ProgettoService } from 'src/app/archivi/progetto/progetto.service';
import { SpesaInvestimentoService } from 'src/app/budget/spesainvestimento/spesainvestimento.service';
import { FornitoreModel } from 'src/app/shared/model/fornitore.model';
import { OrdineAcquistoModel } from 'src/app/shared/model/ordineacquisto.model';
import { ProgettoModel } from 'src/app/shared/model/progetto-model';
import { SpesaInvestimentoModel } from 'src/app/shared/model/spesainvestimento.model';
import { OrdineAcquistoService } from '../ordineacquisto.service';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-modifica-ordineacquisto',
  templateUrl: './modifica-ordineacquisto.component.html',
  styleUrls: ['./modifica-ordineacquisto.component.scss'],
  providers: [ConfirmationService, MessageService, DatePipe]
})
export class ModificaOrdineacquistoComponent {
  @ViewChild(Table) table: Table | undefined;
  constructor(private service: OrdineAcquistoService,
    private router: Router,
    private messageService: MessageService,
    private fornService: FornitoreService,
    private proService: ProgettoService,
    private spesaService: SpesaInvestimentoService,
    private route: ActivatedRoute) { }


  formModifica!: FormGroup;
  elencoFornitori!: FornitoreModel[];
  elencoProgetti!: ProgettoModel[];
  elencoSpese!: SpesaInvestimentoModel[];
  formDettaglio!: FormGroup;
  dettagliTransient: any[] = [];
  visible: boolean = false;
  visible1: boolean = false;
  totRowsd!: number;
  pageIndexd: number = 0;
  pageSized: number = 3;
  nImporto: number = 0;
  idOrdine!: number;
  elencoDettagli!: any[];
  index: number = 0;
  visible2: boolean = false;

  ngOnInit(): void {
    this.formModifica = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      importo: new FormControl(0, [Validators.required]),
      ordineacquisto: new FormControl('', [Validators.required]),
      data: new FormControl(null, [Validators.required]),
      oFornitore: new FormControl(null, [Validators.required]),
    })
    this.formDettaglio = new FormGroup({
      ordineAcquisto: new FormControl(null),
      oSpesaInvestimento: new FormControl(null, [Validators.required]),
      oProgetto: new FormControl(null, [Validators.required]),
      importo: new FormControl(0, [Validators.required]),
      quantita: new FormControl(0, [Validators.required]),
    })
    this.formModifica.controls['importo'].disable();
    this.route.params.subscribe(
      (params) => {
        this.idOrdine = params['id'];

        this.service.getById(this.idOrdine).subscribe((object) => {
          this.formModifica.controls['id'].setValue(this.idOrdine);
          this.formModifica.controls['importo'].setValue(object.importo);
          this.formModifica.controls['ordineacquisto'].setValue(object.ordineacquisto);
          const dateObject = new Date(object.data);
          this.formModifica.controls['data'].setValue(dateObject),
            this.formModifica.controls['oFornitore'].setValue(object.oFornitore?.id);
        })
      })
    this.service.getDettagli1(this.idOrdine).subscribe((risposta: any) => {
      this.elencoDettagli = risposta;
      this.totRowsd = this.elencoDettagli.length;
    })

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
    const ordineAcquisto: OrdineAcquistoModel = {
      id: this.idOrdine,
      importo: this.formModifica.controls['importo']?.value,
      ordineacquisto: this.formModifica.controls['ordineacquisto'].value,
      data: this.formModifica.controls['data'].value,
      oFornitore: this.elencoFornitori.find(fornitore => fornitore.id === this.formModifica.controls['oFornitore'].value)
    }
    console.log(ordineAcquisto.importo)
    if (this.formModifica.valid) {
      this.service.save(ordineAcquisto).subscribe(
        () => {
          if (this.dettagliTransient.length !== 0) {
            this.service.saveDettagli(this.dettagliTransient).subscribe(() => {

            });
          }
          this.router.navigate(['ordineacquisto/gestione'])
          localStorage.setItem('fornitore', this.formModifica.controls['oFornitore'].value)
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }


  addDetail() {
    const ordineAcquisto: OrdineAcquistoModel = {
      id: this.idOrdine,
      importo: this.nImporto,
      ordineacquisto: this.formModifica.controls['ordineacquisto'].value,
      data: this.formModifica.controls['data'].value,
      oFornitore: this.elencoFornitori.find(fornitore => fornitore.id === this.formModifica.controls['oFornitore'].value)
    }
    const dettaglio: any = {
      oOrdineAcquisto: ordineAcquisto,
      oProgetto: this.formDettaglio.value.oProgetto,
      oSpesaInvestimento: this.formDettaglio.value.oSpesaInvestimento,
      importo: this.formDettaglio.value.importo,
      quantita: this.formDettaglio.value.quantita
    }
    this.elencoDettagli.push(dettaglio);
    this.dettagliTransient.push(dettaglio)
    this.totRowsd = this.elencoDettagli.length;
    this.formDettaglio.reset();
    const totalImporto = this.elencoDettagli.reduce((total, det) => total + det.importo * det.quantita, 0);
    this.formModifica.patchValue({
      importo: totalImporto
    });
    const startPage = this.pageIndexd * this.pageSized;
    const endPage = Math.min(startPage + this.pageSized);
    console.log(startPage, endPage)

    this.dettagliTransient = this.elencoDettagli.slice(startPage, endPage);
    console.log(this.dettagliTransient);
    /*   reduce è un metodo degli array in JavaScript che consente di iterare attraverso gli elementi dell'array e accumulare un valore in base a una funzione di riduzione specificata.
    La funzione di riduzione accetta due argomenti: il "total" (l'accumulatore) e il "det" (l'elemento corrente nell'iterazione).
    total rappresenta il valore accumulato fino a quel punto, inizializzato con il valore 0.
    det rappresenta l'oggetto dettaglio corrente nell'iterazione. */
  }

  deleteDetail(index: number) {
    const i = this.elencoDettagli.indexOf(index);
    const y = this.dettagliTransient.indexOf(index)
    console.log(i)
    console.log(y)
    this.elencoDettagli.splice(i, 1)
    this.dettagliTransient.splice(y, 1)

    const totalImporto = this.elencoDettagli.reduce((total, det) => total + det.importo * det.quantita, 0);
    this.formModifica.patchValue({
      importo: totalImporto
    });
    this.totRowsd--;
    if (this.dettagliTransient.length === 0) {
      this.pageIndexd--;
    }
    const startPage = this.pageIndexd * this.pageSized;
    const endPage = Math.min(startPage + this.pageSized);
    console.log(startPage, endPage)

    this.dettagliTransient = this.elencoDettagli.slice(startPage, endPage);
    console.log(this.dettagliTransient);

  }
  createPage() {

    const startPage = this.pageIndexd * this.pageSized;
    const endPage = Math.min(startPage + this.pageSized);
    console.log(startPage, endPage)

    this.dettagliTransient = this.elencoDettagli.slice(startPage, endPage);
    console.log(this.dettagliTransient);

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
    this.dettagliTransient[this.index].importo = this.formDettaglio.controls['importo'].value;
    this.dettagliTransient[this.index].quantita = this.formDettaglio.controls['quantita'].value;
    this.dettagliTransient[this.index].oSpesaInvestimento = this.elencoSpese.find(spesa => spesa.id === this.formDettaglio.controls['oSpesaInvestimento'].value);
    this.dettagliTransient[this.index].oProgetto = this.elencoProgetti.find(progetto => progetto.id === this.formDettaglio.controls['oProgetto'].value);
    const totalImporto = this.elencoDettagli.reduce((total, det) => total + det.importo * det.quantita, 0);
    this.formModifica.patchValue({
      importo: totalImporto
    });
    this.visible2 = false;
    this.formDettaglio.reset();
  }
  updateDetails(index: any) {
    this.visible2 = true;
    this.index = this.dettagliTransient.indexOf(index);
    this.formDettaglio.controls['importo'].setValue(index.importo);
    this.formDettaglio.controls['quantita'].setValue(index.quantita);
    this.formDettaglio.controls['oSpesaInvestimento'].setValue(index.oSpesaInvestimento!.id),
      this.formDettaglio.controls['oProgetto'].setValue(index.oProgetto!.id);
  }
  back(idFornitore: number) {
    this.router.navigate(['ordineacquisto/gestione'])
    localStorage.setItem('fornitore', idFornitore.toString())
  }
}
