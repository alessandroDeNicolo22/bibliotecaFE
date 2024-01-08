import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgettoModel } from 'src/app/shared/model/progetto-model';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProgettoService {

  constructor(private httpClient: HttpClient) { }

  getLista(): Observable<ProgettoModel[]> {
    return this.httpClient.get<ProgettoModel[]>(`${environment.urlApi}/progetto/list`);
  }

  getPage(pageIndex: number, pageSize: number): Observable<ProgettoModel[]>{
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.get<ProgettoModel[]>(`${environment.urlApi}/progetto/list-page`, {params});
  }

  getById(idProgetto: number): Observable<ProgettoModel>{
    return this.httpClient.get<ProgettoModel>(`${environment.urlApi}/progetto/findbyid/${idProgetto}`);
  }

  salva(progetto: any): Observable<Object> {
    return this.httpClient.post(`${environment.urlApi}/progetto/nuovoModifica`, progetto);
  }

  checkElimina(idProgetto: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.urlApi}/progetto/checkElimina/${idProgetto}`);
  }

  elimina(idProgetto: number): Observable<any> {
    return this.httpClient.delete(`${environment.urlApi}/progetto/elimina/${idProgetto}`);
  }
}
