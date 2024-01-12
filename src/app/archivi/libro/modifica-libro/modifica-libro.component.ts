import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GenereService } from '../../genere/genere.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LibroService } from '../libro.service';
import { CasaEditriceService } from '../../casaeditrice/ce.service';
import { AutoreService } from '../../autore/autore.service';
import { AutoreModel } from 'src/app/shared/model/autore-model';
import { GenereModel } from 'src/app/shared/model/genere.model';
import { CasaEditriceModel } from 'src/app/shared/model/ce.model';

@Component({
  selector: 'app-modifica-libro',
  templateUrl: './modifica-libro.component.html',
  styleUrls: ['./modifica-libro.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ModificaLibroComponent {
  constructor(private autoreService: AutoreService, private ceService: CasaEditriceService, private service: LibroService, private genereService: GenereService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) { }

  formModifica!: FormGroup;
  idLibro!: number;
  listAutore!: AutoreModel[];
  listGenere!: GenereModel[];
  listCE!: CasaEditriceModel[];

  ngOnInit(): void {
    this.formModifica = new FormGroup({
      oAutore: new FormControl('', Validators.required),
      oGenere: new FormControl('', Validators.required),
      oCasaeditrice: new FormControl('', Validators.required),
      titolo: new FormControl('', Validators.required)
    });

    this.autoreService.getLista().subscribe((response) => {
      this.listAutore = response;
    });
    this.ceService.getLista().subscribe((response) => {
      this.listCE = response;
    });
    this.genereService.getLista().subscribe((response) => {
      this.listGenere = response;
    });

    this.route.params.subscribe(
      (params) => {
        this.idLibro = params['id'];
        this.service.getById(this.idLibro).subscribe(
          (object) => {
            this.formModifica.controls['titolo'].setValue(object.titolo);
            this.formModifica.controls['oAutore'].setValue(object.oAutore);
            this.formModifica.controls['oGenere'].setValue(object.oGenere);
            this.formModifica.controls['oCasaeditrice'].setValue(object.oCasaeditrice);
          }
        )
      }
    );
  }


  submitForm() {
    /* 
        const genere: GenereModel = {
          id: this.idGenere,
          nome: this.formModifica.controls['nome'].value
        }
        if (this.formModifica.valid) {
          this.service.salva(genere).subscribe(
            () => {
              this.router.navigate(['genere/elenco'])
              localStorage.setItem('genere', "1")
            }
          )
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
        }
      } */
  }
  inputNotEmpty(): boolean {
    const oAutore = this.formModifica.controls['oAutore'].value;
    const oGenere = this.formModifica.controls['oGenere'].value;
    const oCasaeditrice = this.formModifica.controls['oCasaeditrice'].value;
    const titolo = this.formModifica.controls['titolo'].value;
    return !oAutore || !oCasaeditrice || !oGenere || !titolo;
  }
}

