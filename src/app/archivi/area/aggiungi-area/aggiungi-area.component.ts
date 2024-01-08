import { Component, OnInit } from '@angular/core';
import { AreaService } from '../area.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-aggiungi-area',
  templateUrl: './aggiungi-area.component.html',
  styleUrls: ['./aggiungi-area.component.scss'],
  providers: [MessageService]
})
export class AggiungiAreaComponent implements OnInit {

  constructor(private areaService: AreaService, private router:Router, private message: MessageService) {}
  
  areaModel!: any;


  ngOnInit(): void {
    this.areaModel = {
      codice: '',
      area: ''
    }
  }



  aggiungi(){
    if(this.areaModel.codice !== '' && this.areaModel.area !== ''){
      this.areaService.salva(this.areaModel).subscribe(
        () => {
          localStorage.setItem('condizione', 'aggiunta');
          this.router.navigate(['area/elenco']);
        }
      )
    }else{
      if(this.areaModel.codice.length>2){
        this.message.add({ severity: 'error', summary: 'Errore', detail: 'Il codice può avere max 2 caratteri' });
      }else{
        this.message.add({ severity: 'error', summary: 'Errore', detail: 'I campi non possono essere vuoti' });
      }
    }
    
  }

}
