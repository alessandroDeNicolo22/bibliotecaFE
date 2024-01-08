import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProgettoService } from '../progetto.service';
import { ProgettoModel } from 'src/app/shared/model/progetto-model';

@Component({
  selector: 'app-modifica-progetto',
  templateUrl: './modifica-progetto.component.html',
  styleUrls: ['./modifica-progetto.component.scss'],
  providers: [MessageService]
})
export class ModificaProgettoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private progettoService: ProgettoService, private router: Router, private message: MessageService) {}
  
  progettoModel!: ProgettoModel;

  ngOnInit(): void {
    this.progettoModel = {
      id: 0,
      codice: '',
      progetto: ''
    }

    this.route.params.subscribe(
      (params) => {
        this.progettoService.getById(params['id']).subscribe(
          (progetto: ProgettoModel) => {
            this.progettoModel.id = params['id'];
            this.progettoModel.codice = progetto.codice;
            this.progettoModel.progetto = progetto.progetto;
          }
        )
      }
    )

  }

  modifica(){
    if(this.progettoModel.codice !== '' && this.progettoModel.progetto !== '' && (this.progettoModel.codice.length>0 && this.progettoModel.codice.length<=3)){
      this.progettoService.salva(this.progettoModel).subscribe(
        () => {
          localStorage.setItem('condizione', 'modificato');
          this.router.navigate(['progetto/elenco']);
        }
      )
    }else{
      if(this.progettoModel.codice.length>3){
        this.message.add({ severity: 'error', summary: 'Errore', detail: 'Il codice può avere max 3 caratteri' });
      }else{
        this.message.add({ severity: 'error', summary: 'Errore', detail: 'I campi non possono essere vuoti' });
      }
    }
  }



}
