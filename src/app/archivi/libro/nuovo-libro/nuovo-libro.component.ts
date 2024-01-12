import { Component } from '@angular/core';
import { LibroService } from '../libro.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LibroModel } from 'src/app/shared/model/libro.model';
import { AutoreService } from '../../autore/autore.service';
import { AutoreModel } from 'src/app/shared/model/autore-model';
import { CasaEditriceService } from '../../casaeditrice/ce.service';
import { CasaEditriceModel } from 'src/app/shared/model/ce.model';
import { GenereService } from '../../genere/genere.service';
import { GenereModel } from 'src/app/shared/model/genere.model';

@Component({
  selector: 'app-nuovo-libro',
  templateUrl: './nuovo-libro.component.html',
  styleUrls: ['./nuovo-libro.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class NuovoLibroComponent {

  constructor(private service: LibroService, private autoreService: AutoreService, private ceService: CasaEditriceService, private genereService: GenereService, private router: Router, private messageService: MessageService) { }

  formNuovo!: FormGroup;
  listAutore!: AutoreModel[];
  listGenere!: GenereModel[];
  listCE!: CasaEditriceModel[];

  ngOnInit(): void {
    this.formNuovo = new FormGroup({
      oAutore: new FormControl('', [Validators.required]),
      oGenere: new FormControl('', Validators.required),
      oCasaeditrice: new FormControl('', Validators.required),
      titolo: new FormControl('', Validators.required)
    })
    this.autoreService.getLista().subscribe((response) => {
      this.listAutore = response;
    });
    this.ceService.getLista().subscribe((response) => {
      this.listCE = response;
    });
    this.genereService.getLista().subscribe((response) => {
      this.listGenere = response;
    });

  }
  submitForm() {
    const libro: LibroModel = {
      oAutore: this.formNuovo.controls['oAutore'].value,
      oCasaeditrice: this.formNuovo.controls['oCasaeditrice'].value,
      oGenere: this.formNuovo.controls['oGenere'].value,
      titolo: this.formNuovo.controls['titolo'].value,
    }

    if (this.formNuovo.valid) {
      this.service.save(libro).subscribe(
        () => {
          this.router.navigate(['libro/elenco'])
          localStorage.setItem('libro', "ok")
        }
      )
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attenzione', detail: 'I campi non possono essere vuoti!' });
    }


  }
  inputNotEmpty(): boolean {
    const oAutore = this.formNuovo.controls['oAutore'].value;
    const oGenere = this.formNuovo.controls['oGenere'].value;
    const oCasaeditrice = this.formNuovo.controls['oCasaeditrice'].value;
    const titolo = this.formNuovo.controls['titolo'].value;
    return !oAutore || !oCasaeditrice || !oGenere || !titolo;
  }
}


