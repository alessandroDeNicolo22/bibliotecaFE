import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FornitoreModel } from 'src/app/shared/model/fornitore.model';
import { FornitoreService } from '../fornitore.service';


@Component({
  selector: 'app-nuovo-fornitore',
  templateUrl: './nuovo-fornitore.component.html',
  styleUrls: ['./nuovo-fornitore.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class NuovoFornitoreComponent {
  constructor(private service: FornitoreService, private router: Router, private messageService: MessageService) { }

  formNuovo!: FormGroup;
  provincieItaliane = [
    { nome: 'Agrigento', sigla: 'AG' },
    { nome: 'Alessandria', sigla: 'AL' },
    { nome: 'Ancona', sigla: 'AN' },
    { nome: 'Aosta', sigla: 'AO' },
    { nome: 'Arezzo', sigla: 'AR' },
    { nome: 'Ascoli Piceno', sigla: 'AP' },
    { nome: 'Asti', sigla: 'AT' },
    { nome: 'Avellino', sigla: 'AV' },
    { nome: 'Bari', sigla: 'BA' },
    { nome: 'Barletta-Andria-Trani', sigla: 'BT' },
    { nome: 'Belluno', sigla: 'BL' },
    { nome: 'Benevento', sigla: 'BN' },
    { nome: 'Bergamo', sigla: 'BG' },
    { nome: 'Biella', sigla: 'BI' },
    { nome: 'Bologna', sigla: 'BO' },
    { nome: 'Bolzano', sigla: 'BZ' },
    { nome: 'Brescia', sigla: 'BS' },
    { nome: 'Brindisi', sigla: 'BR' },
    { nome: 'Cagliari', sigla: 'CA' },
    { nome: 'Caltanissetta', sigla: 'CL' },
    { nome: 'Campobasso', sigla: 'CB' },
    { nome: 'Carbonia-Iglesias', sigla: 'CI' },
    { nome: 'Caserta', sigla: 'CE' },
    { nome: 'Catania', sigla: 'CT' },
    { nome: 'Catanzaro', sigla: 'CZ' },
    { nome: 'Chieti', sigla: 'CH' },
    { nome: 'Como', sigla: 'CO' },
    { nome: 'Cosenza', sigla: 'CS' },
    { nome: 'Cremona', sigla: 'CR' },
    { nome: 'Crotone', sigla: 'KR' },
    { nome: 'Cuneo', sigla: 'CN' },
    { nome: 'Enna', sigla: 'EN' },
    { nome: 'Fermo', sigla: 'FM' },
    { nome: 'Ferrara', sigla: 'FE' },
    { nome: 'Firenze', sigla: 'FI' },
    { nome: 'Foggia', sigla: 'FG' },
    { nome: 'Forlì-Cesena', sigla: 'FC' },
    { nome: 'Frosinone', sigla: 'FR' },
    { nome: 'Genova', sigla: 'GE' },
    { nome: 'Gorizia', sigla: 'GO' },
    { nome: 'Grosseto', sigla: 'GR' },
    { nome: 'Imperia', sigla: 'IM' },
    { nome: 'Isernia', sigla: 'IS' },
    { nome: 'La Spezia', sigla: 'SP' },
    { nome: 'L\'Aquila', sigla: 'AQ' },
    { nome: 'Latina', sigla: 'LT' },
    { nome: 'Lecce', sigla: 'LE' },
    { nome: 'Lecco', sigla: 'LC' },
    { nome: 'Livorno', sigla: 'LI' },
    { nome: 'Lodi', sigla: 'LO' },
    { nome: 'Lucca', sigla: 'LU' },
    { nome: 'Macerata', sigla: 'MC' },
    { nome: 'Mantova', sigla: 'MN' },
    { nome: 'Massa-Carrara', sigla: 'MS' },
    { nome: 'Matera', sigla: 'MT' },
    { nome: 'Messina', sigla: 'ME' },
    { nome: 'Milano', sigla: 'MI' },
    { nome: 'Modena', sigla: 'MO' },
    { nome: 'Monza e della Brianza', sigla: 'MB' },
    { nome: 'Napoli', sigla: 'NA' },
    { nome: 'Novara', sigla: 'NO' },
    { nome: 'Nuoro', sigla: 'NU' },
    { nome: 'Ogliastra', sigla: 'OG' },
    { nome: 'Olbia-Tempio', sigla: 'OT' },
    { nome: 'Oristano', sigla: 'OR' },
    { nome: 'Padova', sigla: 'PD' },
    { nome: 'Palermo', sigla: 'PA' },
    { nome: 'Parma', sigla: 'PR' },
    { nome: 'Pavia', sigla: 'PV' },
    { nome: 'Perugia', sigla: 'PG' },
    { nome: 'Pesaro e Urbino', sigla: 'PU' },
    { nome: 'Pescara', sigla: 'PE' },
    { nome: 'Piacenza', sigla: 'PC' },
    { nome: 'Pisa', sigla: 'PI' },
    { nome: 'Pistoia', sigla: 'PT' },
    { nome: 'Pordenone', sigla: 'PN' },
    { nome: 'Potenza', sigla: 'PZ' },
    { nome: 'Prato', sigla: 'PO' },
    { nome: 'Ragusa', sigla: 'RG' },
    { nome: 'Ravenna', sigla: 'RA' },
    { nome: 'Reggio Calabria', sigla: 'RC' },
    { nome: 'Reggio Emilia', sigla: 'RE' },
    { nome: 'Rieti', sigla: 'RI' },
    { nome: 'Rimini', sigla: 'RN' },
    { nome: 'Roma', sigla: 'RM' },
    { nome: 'Rovigo', sigla: 'RO' },
    { nome: 'Salerno', sigla: 'SA' },
    { nome: 'Medio Campidano', sigla: 'VS' },
    { nome: 'Sassari', sigla: 'SS' },
    { nome: 'Savona', sigla: 'SV' },
    { nome: 'Siena', sigla: 'SI' },
    { nome: 'Siracusa', sigla: 'SR' },
    { nome: 'Sondrio', sigla: 'SO' },
    { nome: 'Taranto', sigla: 'TA' },
    { nome: 'Teramo', sigla: 'TE' },
    { nome: 'Terni', sigla: 'TR' },
    { nome: 'Torino', sigla: 'TO' },
    { nome: 'Ogliastra', sigla: 'OG' },
    { nome: 'Trapani', sigla: 'TP' },
    { nome: 'Trento', sigla: 'TN' },
    { nome: 'Treviso', sigla: 'TV' },
    { nome: 'Trieste', sigla: 'TS' },
    { nome: 'Udine', sigla: 'UD' },
    { nome: 'Varese', sigla: 'VA' },
    { nome: 'Venezia', sigla: 'VE' },
    { nome: 'Verbano-Cusio-Ossola', sigla: 'VB' },
    { nome: 'Vercelli', sigla: 'VC' },
    { nome: 'Verona', sigla: 'VR' },
    { nome: 'Vibo Valentia', sigla: 'VV' },
    { nome: 'Vicenza', sigla: 'VI' },
    { nome: 'Viterbo', sigla: 'VT' }
  ];
  
  ngOnInit(): void {
    this.formNuovo = new FormGroup({
      ragioneSociale: new FormControl('', [Validators.required]),
      indirizzo: new FormControl('', [Validators.required]),
      citta: new FormControl('', [Validators.required]),
      cap: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      partitaIva: new FormControl('', [Validators.required])
    })
  }


  submitForm() {

    const fornitore: FornitoreModel = {
      ragioneSociale: this.formNuovo.controls['ragioneSociale'].value,
      indirizzo: this.formNuovo.controls['indirizzo'].value,
      citta: this.formNuovo.controls['citta'].value,
      cap: this.formNuovo.controls['cap'].value,
      provincia: this.formNuovo.controls['provincia'].value.toUpperCase(),
      partitaIva: this.formNuovo.controls['partitaIva'].value
    }
    console.log(fornitore)
    if (this.formNuovo.valid) {
      this.service.salva(fornitore).subscribe(
        () => {
          this.router.navigate(['fornitore/elenco'])
          localStorage.setItem('fornitore', "ok")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }
}
