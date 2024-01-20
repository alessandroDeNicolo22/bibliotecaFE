import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProfessoreModel } from 'src/app/shared/model/professore-model';
import { ProfessoreService } from '../professore.service';

@Component({
  selector: 'app-modifica-professore',
  templateUrl: './modifica-professore.component.html',
  styleUrls: ['./modifica-professore.component.scss'],
  providers: [MessageService]
})
export class ModificaProfessoreComponent implements OnInit {

  constructor(private route: ActivatedRoute, private professoreService: ProfessoreService, private router: Router, private message: MessageService) {}
  
  professoreModel!: ProfessoreModel;

  ngOnInit(): void {
    this.professoreModel = {
      id: 0,
      cognome: '',
      nome: '',
      matricola: 0
    }

    this.route.params.subscribe(
      (params) => {
        this.professoreService.getById(params['id']).subscribe(
          (professore: ProfessoreModel) => {
            this.professoreModel.id = params['id'];
            this.professoreModel.cognome = professore.cognome;
            this.professoreModel.nome = professore.nome;
            this.professoreModel.matricola = professore.matricola;
          }
        )
      }
    )

  }

  modifica(){
    if(this.professoreModel.nome !== '' && this.professoreModel.cognome !== '' && this.professoreModel.matricola>0){
      this.professoreService.salva(this.professoreModel).subscribe(
        () => {
          localStorage.setItem('condizione', 'modificato');
          this.router.navigate(['professore/elenco']);
        }
      )
    }else{
        this.message.add({ severity: 'error', summary: 'Errore', detail: 'I campi non possono essere vuoti' });
    }
  }



}
