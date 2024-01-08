import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaModel } from 'src/app/shared/model/area-model';
import { AreaService } from '../area.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modifica-area',
  templateUrl: './modifica-area.component.html',
  styleUrls: ['./modifica-area.component.scss'],
  providers: [MessageService]
})
export class ModificaAreaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private areaService: AreaService, private router: Router, private message: MessageService) {}

  areaModel!: AreaModel;

  ngOnInit(): void {
    this.areaModel = {
      id: 0,
      codice: '',
      area: ''
    }

    this.route.params.subscribe(
      (params) => {
        this.areaService.getById(params['id']).subscribe(
          (area: AreaModel) => {
            this.areaModel.id = params['id'];
            this.areaModel.codice = area.codice;
            this.areaModel.area = area.area;
          }
        )
      }
    )

    
  }


  modifica(){
    if(this.areaModel.codice !== '' && this.areaModel.area !== '' && (this.areaModel.codice.length>0 && this.areaModel.codice.length<=2)){
      this.areaService.salva(this.areaModel).subscribe(
        () => {
          localStorage.setItem('condizione', 'modificata');
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
