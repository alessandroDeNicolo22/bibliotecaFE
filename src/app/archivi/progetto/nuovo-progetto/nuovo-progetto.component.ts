import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProgettoService } from '../progetto.service';

@Component({
  selector: 'app-nuovo-progetto',
  templateUrl: './nuovo-progetto.component.html',
  styleUrls: ['./nuovo-progetto.component.scss'],
  providers: [MessageService]
})
export class NuovoProgettoComponent implements OnInit {

  constructor(private progettoService: ProgettoService, private router: Router, private message: MessageService) { }

  progettoModel!: any;

  ngOnInit(): void {
    this.progettoModel = {
      codice: '',
      progetto: ''
    }
  }


  aggiungi() {
    if (this.progettoModel.codice !== '' && this.progettoModel.progetto !== '') {
      this.progettoService.salva(this.progettoModel).subscribe(
        () => {
          localStorage.setItem('condizione', 'aggiunto');
          this.router.navigate(['progetto/elenco']);
        }
      )
    } else {
      if (this.progettoModel.codice.length > 3) {
        this.message.add({ severity: 'error', summary: 'Errore', detail: 'Il codice può avere max 3 caratteri' });
      } else {
        this.message.add({ severity: 'error', summary: 'Errore', detail: 'I campi non possono essere vuoti' });
      }
    }

  }





}
