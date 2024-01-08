import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdineAcquistoModel } from '../shared/model/ordineacquisto.model';
import { environment } from 'src/environment/environment.development';
import { OrdineAcquistoDettaglioModel } from '../shared/model/ordinedettaglio.model';

@Injectable({
  providedIn: 'root'
})
export class OrdineAcquistoService {

  constructor(private httpClient: HttpClient) { }

  getLista(pageIndex: number, pageSize: number): Observable<OrdineAcquistoModel[]> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
    return this.httpClient.get<OrdineAcquistoModel[]>(`${environment.urlApi}/ordineacquisto/listPage`, { params });
  }
  getListaPerFornitore(id:number,pageIndex: number, pageSize: number): Observable<OrdineAcquistoModel[]> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
    return this.httpClient.post<OrdineAcquistoModel[]>(`${environment.urlApi}/ordineacquisto/listByFornitore`,id,{ params });
  }
  getById(id: number): Observable<OrdineAcquistoModel> {
    return this.httpClient.get<OrdineAcquistoModel>(`${environment.urlApi}/ordineacquisto/findbyid/${id}`);
  }

  save(odineAcquisto: OrdineAcquistoModel) {
    return this.httpClient.post<OrdineAcquistoModel>(`${environment.urlApi}/ordineacquisto/save`, odineAcquisto);
  }

  delete(id: number) {
    return this.httpClient.delete(`${environment.urlApi}/ordineacquisto/delete/${id}`);
  }

  getDettagli(id:number,pageIndex: number, pageSize: number): Observable<OrdineAcquistoDettaglioModel[]> {
    console.log(id)
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
    return this.httpClient.post<OrdineAcquistoDettaglioModel[]>(`${environment.urlApi}/ordineacquisto/findDettagli`,id,{ params });
  }

  getDettagli1(id:number): Observable<OrdineAcquistoDettaglioModel[]> {
    const params = new HttpParams()
      .set('id',id.toString());
    return this.httpClient.get<OrdineAcquistoDettaglioModel[]>(`${environment.urlApi}/ordineacquisto/findDettagli1`,{ params });
  }

  saveDettagli(dettagli:OrdineAcquistoDettaglioModel[]){
    return this.httpClient.post<OrdineAcquistoDettaglioModel[]>(`${environment.urlApi}/ordinedettaglio/saveDettagli`, dettagli)
  }
  getFilter(object:any, pageIndex:number, pageSize:number){
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
    return this.httpClient.post<OrdineAcquistoModel[]>(`${environment.urlApi}/ordineacquisto/filterDate`, object,{ params } )
  }
  getFilterData(object:any,pageIndex:number, pageSize:number){
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString());
    return this.httpClient.post<OrdineAcquistoModel[]>(`${environment.urlApi}/ordineacquisto/filterOnlyDate`, object,{ params } )
  }
  /* filtraFornitoreData(dataDa: any, dataA: any, IDFornitore: number, page: number, itemsPerPage: number) {

    const params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());
    const requestBody = {
      dataDa: dataDa,
      dataA: dataA,
      IDFornitore: IDFornitore
    }
    return this.httpClient.post<OrdineAcquistoModel[]>(`${environment.urlApi}/ordineacquisto/fornitoredata`, requestBody, { params });
  }

  filtraProgettoData(dataDa: any, dataA: any, IDProgetto: number, page: number, itemsPerPage: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());
    const requestBody = {
      dataDa: dataDa,
      dataA: dataA,
      IDProgetto: IDProgetto
    }
    return this.httpClient.post<OrdineAcquistoModel[]>(`${environment.urlApi}/ordineacquisto/progettodata`, requestBody, {params})
  }

  filtraSottocategoriaData(dataDa: any, dataA: any, IDSottocategoria: number, page: number, itemsPerPage: number) {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('itemsPerPage', itemsPerPage.toString());
    const requestBody = {
      dataDa: dataDa,
      dataA: dataA,
      IDSottocategoria: IDSottocategoria
    }
    return this.httpClient.post<OrdineAcquistoModel[]>(`${environment.urlApi}/ordineacquisto/sottocategoriadata`, requestBody, {params})
  }

  filtraPerFornitore(id: number, page: number, itemsPerPage: number) {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('itemsPerPage', itemsPerPage.toString());
    return this.httpClient.get<OrdineAcquistoModel[]>(`${environment.urlApi}/ordineacquisto/fornitore/${id}`, {params})
  }

  filtraPerProgetto(id: number, page: number, itemsPerPage: number) {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('itemsPerPage', itemsPerPage.toString());
    return this.httpClient.get<OrdineAcquistoModel[]>(`${environment.urlApi}/ordineacquisto/progetto/${id}`, {params})
  }

  filtraPerSottocategoria(id: number, page: number, itemsPerPage: number) {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('itemsPerPage', itemsPerPage.toString());
    return this.httpClient.get<OrdineAcquistoModel[]>(`${environment.urlApi}/ordineacquisto/sottocategoria/${id}`, {params})
  }

  filtraData(dataDa: any, dataA: any, page: number, itemsPerPage: number) {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('itemsPerPage', itemsPerPage.toString());
    const requestBody = {
      dataDa: dataDa,
      dataA: dataA
    }
    return this.httpClient.post<OrdineAcquistoModel[]>('/data', requestBody, {params})
  }

  dettagli(id: number) {
    return this.httpClient.get<number>(`${environment.urlApi}/ordineacquisto/dettagli/${id}`);
  } */

}
