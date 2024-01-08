import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { SottocategoriaService } from 'src/app/archivi/sottocategoria/sottocategoria.service';
import { AreaModel } from 'src/app/shared/model/area.model';
import { SottocategoriaModel } from 'src/app/shared/model/sottocategoria.model';


@Component({
  selector: 'app-avanzamento-budget',
  templateUrl: './avanzamento-budget.component.html',
  styleUrls: ['./avanzamento-budget.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AvanzamentoBudgetComponent {
  constructor(private service: SottocategoriaService, private messageService: MessageService) { }

  formNuovo!: FormGroup;
  elencoAree!: AreaModel[];
  pageIndex: number = 0;
  pageSize: number = 3;
  totRows !: number;
  elenco!: SottocategoriaModel[];

  ngOnInit(): void {
    this.formNuovo = new FormGroup({
      oArea: new FormControl('', [Validators.required]),
    });
    this.service.getAree().subscribe((elenco: AreaModel[]) => {
      this.elencoAree = elenco;
    });
  }


  submitForm() {
    console.log(this.formNuovo.value.oArea)
    if (this.formNuovo.valid) {
      this.service.ricercaPage(this.formNuovo.value.oArea, this.pageIndex, this.pageSize).subscribe(
        (risposta: any) => {
          if(risposta.totalElements === 0 ){
            this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'Non ci sono elementi!' });
          }
          this.elenco = risposta.content;
          
          this.totRows = risposta.totalElements;
          

          localStorage.setItem('budget', "ok")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }

  }

  onPageChange(event: PaginatorState) {
    if (event.rows !== undefined) {
      this.pageSize = event.rows;
    }
    if (event.first !== undefined) {
      this.pageIndex = event.first / this.pageSize;
    }
    console.log(this.pageIndex, this.pageSize);
    this.service.ricercaPage(this.formNuovo.value.oArea, this.pageIndex, this.pageSize).subscribe(
      (risposta: any) => {
        this.elenco = risposta.content;
        console.log(this.elenco)
        this.totRows = risposta.totalElements;
        console.log(this.totRows)

        localStorage.setItem('budget', "ok")
      }
    )
  }

}

