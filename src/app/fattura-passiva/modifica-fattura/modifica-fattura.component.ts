import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { FornitoreService } from 'src/app/archivi/fornitore/fornitore.service';
import { SpesaInvestimentoService } from 'src/app/budget/spesainvestimento/spesainvestimento.service';
import { PreventivoService } from 'src/app/preventivo/preventivo.service';
import { FatturaPassivaModel } from 'src/app/shared/model/fattura-passiva.model';
import { FornitoreModel } from 'src/app/shared/model/fornitore.model';
import { PreventivoModel } from 'src/app/shared/model/preventivo-model';
import { SpesaInvestimentoModel } from 'src/app/shared/model/spesainvestimento.model';
import { FatturaPassivaService } from '../fattura-passiva.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modifica-fattura',
  templateUrl: './modifica-fattura.component.html',
  styleUrls: ['./modifica-fattura.component.scss'],
  providers: [ConfirmationService, MessageService, DatePipe]
})
export class ModificaFatturaComponent {

  constructor(private service: FatturaPassivaService,
    private router: Router,
    private messageService: MessageService,
    private fornService: FornitoreService,
    private spesaService: SpesaInvestimentoService,
    private preventivoService: PreventivoService,
    private route: ActivatedRoute) { }

  formModifica!: FormGroup;
  elencoFornitori!: FornitoreModel[];
  elencoSpese!: SpesaInvestimentoModel[];
  elencoPreventivi!: PreventivoModel[];
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
  idFattura: number = 0;
  fatturaPassiva:any = {
    id:0,
    data:null,
    numero:'',
    descrizione:'',
    oFornitore:null,
  }

  ngOnInit(): void {
    this.formModifica = new FormGroup({
      data: new FormControl(null, [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      descrizione: new FormControl('', [Validators.required]),
      oFornitore: new FormControl(null, [Validators.required]),
    })
    this.formDettaglio = new FormGroup({
      oSpesainvestimento: new FormControl(null, [Validators.required]),
      oPreventivo: new FormControl(null, [Validators.required]),
      oAliquotaiva: new FormControl(null, [Validators.required]),
      importo: new FormControl(0, [Validators.required]),
      dettaglioFattura: new FormControl('', [Validators.required]),
    })
    this.fornService.getLista().subscribe((elenco: FornitoreModel[]) => {
      this.elencoFornitori = elenco;
    })
    this.preventivoService.getLista().subscribe((elenco: PreventivoModel[]) => {
      this.elencoPreventivi = elenco;
    })
    this.spesaService.getLista().subscribe((elenco: SpesaInvestimentoModel[]) => {
      this.elencoSpese = elenco;
    })
    this.route.params.subscribe(
      (params) => {
        this.idFattura = params['id'];
        this.service.getById(this.idFattura).subscribe(
          (risposta: FatturaPassivaModel) => {
            this.fatturaPassiva = risposta;
            const data = new Date(risposta.data);
            this.formModifica.controls['data'].setValue(data);
            this.formModifica.controls['numero'].setValue(risposta.numero);
            this.formModifica.controls['descrizione'].setValue(risposta.descrizione);
            this.formModifica.controls['oFornitore'].setValue(risposta.oFornitore);
          }
        )
      }
    )

    this.service.getDettagliLista(this.idFattura).subscribe((risposta: any[]) => {
      this.dettagli = risposta;
      this.totRowsd = this.dettagli.length;
    })

  }


  submitForm() {
    const fatturaPassiva: FatturaPassivaModel = {  
      id:this.idFattura,
      data: this.formModifica.controls['data'].value,
      numero: this.formModifica.controls['numero'].value,
      descrizione: this.formModifica.controls['descrizione'].value,
      oFornitore: this.formModifica.controls['oFornitore'].value,
    }
    if (this.formModifica.valid) {
      this.service.salva(fatturaPassiva).subscribe(
        () => {
          if(this.dettagli!.length !== 0){
            this.service.salvaDettagli(this.dettagli).subscribe(()=>{
              
            });
          }
          this.router.navigate(['fatturapassiva/gestione'])
          localStorage.setItem('fornitore', this.formModifica.controls['oFornitore'].value.id)
          localStorage.setItem('message', '1');
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
    
  }

  addDetail() {
    const dettaglio: any = {
      oFatturapassiva: this.fatturaPassiva,
      oSpesainvestimento: this.formDettaglio.value.oSpesainvestimento,
      oPreventivo: this.formDettaglio.value.oPreventivo,
      oAliquotaiva: this.formDettaglio.value.oAliquotaiva,
      importo: this.formDettaglio.value.importo,
      dettaglioFattura: this.formDettaglio.value.dettaglioFattura
    }
    console.log(dettaglio);
    if(this.formDettaglio.valid){
    this.dettagli!.push(dettaglio);
    this.totRowsd = this.dettagli.length;
    this.formDettaglio.reset();

  }else{
    this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' })
  }

  this.createPage()
    
  }

  deleteDetail(index:number){
    const i = this.dettagli.indexOf(index);
    this.dettagli.splice(i,1);

    this.totRowsd--;
    if(this.dettTransienti.length===1){
      this.pageIndexd--;
    }
    this.createPage()
  }
  createPage() {
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
    this.dettagli[this.index].dettaglioFattura = this.formDettaglio.controls['dettaglioFattura'].value;
    this.dettagli[this.index].oSpesainvestimento = this.elencoSpese.find(spesa => spesa.id === this.formDettaglio.controls['oSpesainvestimento'].value);
    this.dettagli[this.index].oPreventivo = this.elencoPreventivi.find(preventivo => preventivo.id === this.formDettaglio.controls['oPreventivo'].value);
 
    this.visible2 = false;
    this.formDettaglio.reset();
  }
  updateDetails(fattura: any) {
    this.visible2 = true;
    this.index = this.dettagli.indexOf(fattura);
    this.formDettaglio.controls['importo'].setValue(fattura.importo);
    this.formDettaglio.controls['dettaglioFattura'].setValue(fattura.dettaglioFattura);
    this.formDettaglio.controls['oSpesainvestimento'].setValue(fattura.oSpesainvestimento.id),
    this.formDettaglio.controls['oPreventivo'].setValue(fattura.oPreventivo.id);
    this.formDettaglio.controls['oAliquotaiva'].setValue(fattura.oAliquotaiva.id);
  }

  back(fornitore: any) {
    this.router.navigate(['fatturapassiva/gestione'])
    localStorage.setItem('fornitore', fornitore.id.toString())
  }

}
