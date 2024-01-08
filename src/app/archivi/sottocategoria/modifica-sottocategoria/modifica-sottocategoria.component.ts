import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AreaModel } from 'src/app/shared/model/area.model';
import { SottocategoriaService } from '../sottocategoria.service';

@Component({
  selector: 'app-modifica-sottocategoria',
  templateUrl: './modifica-sottocategoria.component.html',
  styleUrls: ['./modifica-sottocategoria.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ModificaSottocategoriaComponent {
  constructor(private service: SottocategoriaService, private router: Router, private messageService: MessageService,private route: ActivatedRoute) { }

  formModifica!: FormGroup;
  elencoAree!:AreaModel[];
  idSottoc!:number;
  
  ngOnInit(): void {
    this.formModifica = new FormGroup({
      codice: new FormControl('', [Validators.required]),
      sottocategoria: new FormControl('', [Validators.required]),
      oArea: new FormControl('', [Validators.required]),
      budget: new FormControl(0, [Validators.required])
      
    })
    this.service.getAree().subscribe((elenco:AreaModel[])=>{
      this.elencoAree = elenco;
    });
    this.route.params.subscribe(
      (params) => {
        this.idSottoc = params['id'];
        this.service.getById(this.idSottoc).subscribe(
          (object) => {
            this.formModifica.controls['codice'].setValue(object.codice);
            this.formModifica.controls['sottocategoria'].setValue(object.sottocategoria);
            this.formModifica.controls['budget'].setValue(object.budget);
            this.formModifica.controls['oArea'].setValue(object.oArea?.id);
          }
        )
      }
    )
  }
  submitForm() {
    const sottocategoria: any = {
      id:this.idSottoc,
      codice: this.formModifica.controls['codice'].value,
      sottocategoria: this.formModifica.controls['sottocategoria'].value,
      oArea: this.elencoAree.find(area => area.id === this.formModifica.value.oArea),
      budget: this.formModifica.controls['budget'].value
    }
    console.log(sottocategoria)
    if (this.formModifica.valid) {
      this.service.salva(sottocategoria).subscribe(
        () => {
          this.router.navigate(['sottocategoria/elenco'])
          localStorage.setItem('sottocategoria', "1")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }
  }
}
