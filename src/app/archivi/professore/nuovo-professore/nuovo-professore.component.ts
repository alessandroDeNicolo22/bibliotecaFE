import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProfessoreService } from '../professore.service';

@Component({
  selector: 'app-nuovo-professore',
  templateUrl: './nuovo-professore.component.html',
  styleUrls: ['./nuovo-professore.component.scss'],
  providers: [MessageService]
})
export class NuovoProfessoreComponent implements OnInit {

  constructor(private professoreService: ProfessoreService, private router: Router, private message: MessageService) { }

  professoreModel!: any;

  ngOnInit(): void {
    this.professoreModel = {
      cognome: '',
      nome: '',
      matricola: 0
    }
  }


  aggiungi() {
    if (this.professoreModel.cognome !== '' && this.professoreModel.nome !== '' && this.professoreModel.matricola !== 0) {
      this.professoreService.salva(this.professoreModel).subscribe(
        () => {
          localStorage.setItem('condizione', 'aggiunto');
          this.router.navigate(['professore/elenco']);
        }
      )
    } else {
        this.message.add({ severity: 'error', summary: 'Errore', detail: 'I campi non possono essere vuoti' });
    }

  }





}
