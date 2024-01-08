import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FornitoreModel } from 'src/app/shared/model/fornitore.model';
import { PreventivoService } from '../preventivo.service';
import { PreventivoModel } from 'src/app/shared/model/preventivo-model';
import { FornitoreService } from 'src/app/archivi/fornitore/fornitore.service';

@Component({
  selector: 'app-modifica-preventivo',
  templateUrl: './modifica-preventivo.component.html',
  styleUrls: ['./modifica-preventivo.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ModificaPreventivoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private preventivoService: PreventivoService, 
    private fornitoreService: FornitoreService, private messageService: MessageService, private router: Router) { }

  formModifica!: FormGroup;

  elencoFornitori: FornitoreModel[] = [];

  idPreventivo!: number;

  ngOnInit(): void {
    this.formModifica = new FormGroup({
      codice: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      preventivo: new FormControl('', Validators.required),
      fornitore: new FormControl('', Validators.required),
      importo: new FormControl('', Validators.required),
      data: new FormControl('', Validators.required)
    })

    const idFornitoreScelto = localStorage.getItem('idFornitoreScelto');
    if (idFornitoreScelto !== null) {

      this.formModifica.controls['fornitore'].setValue(parseInt(idFornitoreScelto))
    }

    this.fornitoreService.getLista().subscribe(
      (risposta: FornitoreModel[]) => {
        this.elencoFornitori = risposta;
      }
    )


    this.route.params.subscribe(
      (params) => {
        this.idPreventivo = params['id'];
        this.preventivoService.getById(this.idPreventivo).subscribe(
          (risposta: PreventivoModel) => {
            const idFornitoreScelto = risposta.oFornitore?.id;
            if(idFornitoreScelto !== undefined){
              localStorage.setItem('idFornitoreScelto', idFornitoreScelto.toString())
            }
  
            const data = new Date(risposta.data);
            this.formModifica.controls['codice'].setValue(risposta.codice),
            this.formModifica.controls['fornitore'].setValue(risposta.oFornitore?.id)
              this.formModifica.controls['preventivo'].setValue(risposta.preventivo),
              this.formModifica.controls['importo'].setValue(risposta.importo),
              this.formModifica.controls['data'].setValue(data)
          }
        )
      }
    )
  }


  modifica() {
    if (this.formModifica.valid) {
      const preventivo: any = {
        id: this.idPreventivo,
        codice: this.formModifica.controls['codice'].value,
        preventivo: this.formModifica.controls['preventivo'].value,
        oFornitore: this.elencoFornitori.find(fornitore => fornitore.id === this.formModifica.controls['fornitore'].value),
        importo: this.formModifica.controls['importo'].value,
        data: this.formModifica.controls['data'].value
      }

      this.preventivoService.salva(preventivo).subscribe(
        () => {
          localStorage.setItem('condizione', 'modificato');
          localStorage.setItem('idFornitoreScelto', this.formModifica.controls['fornitore'].value.toString())
          this.router.navigate(['preventivo/gestione']);
        }
      )

    }else{
      if(this.formModifica.controls['codice'].getError('maxlength')){
        this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Il codice può avere max. 3 caratteri' })
      }else{
        this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' })
      }
      
    }
  }

  getErrorMessage() {
    if (this.formModifica.controls['codice'].getError('maxlength')) {
      return 'Il codice può avere max. 3 caratteri';
    } else {
      return 'Campo obbligatorio';
    }
  }

}
