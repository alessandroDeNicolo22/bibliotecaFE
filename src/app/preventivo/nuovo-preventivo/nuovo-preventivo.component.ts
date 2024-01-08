import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FornitoreService } from 'src/app/archivi/fornitore/fornitore.service';
import { FornitoreModel } from 'src/app/shared/model/fornitore.model';
import { PreventivoService } from '../preventivo.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-nuovo-preventivo',
  templateUrl: './nuovo-preventivo.component.html',
  styleUrls: ['./nuovo-preventivo.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class NuovoPreventivoComponent implements OnInit {

  constructor(private fornitoreService: FornitoreService, private preventivoService: PreventivoService, private router: Router, 
    private messageService: MessageService) { }

  formNuovo!: FormGroup;

  elencoFornitori: FornitoreModel[] = []

  ngOnInit(): void {
    this.formNuovo = new FormGroup({
      codice: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      preventivo: new FormControl('', Validators.required),
      fornitore: new FormControl('', Validators.required),
      importo: new FormControl('', Validators.required),
      data: new FormControl('', Validators.required)
    })

    const idFornitoreScelto = localStorage.getItem('idFornitoreScelto');
    if (idFornitoreScelto !== null) {

      this.formNuovo.controls['fornitore'].setValue(parseInt(idFornitoreScelto))
    }

    this.fornitoreService.getLista().subscribe(
      (risposta: FornitoreModel[]) => {

        this.elencoFornitori = risposta;
      }
    )


  }

  aggiungi(){
    if(this.formNuovo.valid){
      const preventivo: any = {
        codice: this.formNuovo.controls['codice'].value,
        preventivo: this.formNuovo.controls['preventivo'].value,
        oFornitore: this.elencoFornitori.find(fornitore => fornitore.id === this.formNuovo.controls['fornitore'].value),
        importo: this.formNuovo.controls['importo'].value,
        data: this.formNuovo.controls['data'].value
  
      }
  
      this.preventivoService.salva(preventivo).subscribe(
        () => {
          localStorage.setItem('condizione', 'aggiunto');
          localStorage.setItem('idFornitoreScelto', this.formNuovo.controls['fornitore'].value.toString())
          this.router.navigate(['preventivo/gestione']);
        }
      )
    }else{
      if(this.formNuovo.controls['codice'].getError('maxlength')){
        this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Il codice può avere max. 3 caratteri' })
      }else{
        this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' })
      }
    }
  }

  getErrorMessage(){
    if(this.formNuovo.controls['codice'].getError('maxlength')){
      return 'Il codice può avere max. 3 caratteri';
    }else{
      return 'Campo obbligatorio';
    }
  }

}
