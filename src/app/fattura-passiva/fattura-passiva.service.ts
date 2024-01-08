import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FatturaPassivaModel } from '../shared/model/fattura-passiva.model';
import { environment } from 'src/environment/environment.development';
import { FatturaPassivaDettaglioModel } from '../shared/model/fattura-passiva-dettaglio.model';

@Injectable({
  providedIn: 'root'
})
export class FatturaPassivaService {

  constructor(private httpClient: HttpClient) { }

  getLista(): Observable<FatturaPassivaModel[]>{
    return this.httpClient.get<FatturaPassivaModel[]>(`${environment.urlApi}/fatturapassiva/list`);
  }

  getPage(idFornitore: any, pageIndex: number, pageSize: number) {
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.post<FatturaPassivaModel[]>(`${environment.urlApi}/fatturapassiva/listByFornitore`, idFornitore, {params});
  }

  getById(idFattura: number): Observable<FatturaPassivaModel> {
    return this.httpClient.get<FatturaPassivaModel>(`${environment.urlApi}/fatturapassiva/findbyid/${idFattura}`);
  }

  salva(fatturaPassiva: any){
    return this.httpClient.post(`${environment.urlApi}/fatturapassiva/save`, fatturaPassiva);
  }

  delete(idFattura: number){
    return this.httpClient.delete(`${environment.urlApi}/fatturapassiva/delete/${idFattura}`);
  }

  getDettagliPage(idFattura: any, pageIndex: number, pageSize: number){
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.post<FatturaPassivaDettaglioModel[]>(`${environment.urlApi}/fatturapassiva/findDettagli`, idFattura, {params});
  }

  getDettagliLista(idFattura: number){
    const params = new HttpParams().set('id', idFattura.toString())
    return this.httpClient.get<FatturaPassivaDettaglioModel[]>(`${environment.urlApi}/fatturapassiva/findDettagli1`, {params});
  }

  salvaDettagli(elencoDettagli: any[]){
    return this.httpClient.post(`${environment.urlApi}/fatturadettaglio/saveDettagli`, elencoDettagli);
  }

  filtraPerData(date: any, pageIndex: number, pageSize: number){
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.post<FatturaPassivaModel[]>(`${environment.urlApi}/fatturapassiva/filterDate`, date, {params})
  }

  filtraSoloPerData(date: any, pageIndex: number, pageSize: number){
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.post<FatturaPassivaModel[]>(`${environment.urlApi}/fatturapassiva/filterOnlyDate`, date, {params})

  }

}
