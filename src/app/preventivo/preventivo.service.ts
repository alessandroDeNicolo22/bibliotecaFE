import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaModel } from '../shared/model/area.model';
import { PreventivoModel } from '../shared/model/preventivo-model';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PreventivoService {

  constructor(private httpClient: HttpClient) { }

  getLista(): Observable<PreventivoModel[]>{
    return this.httpClient.get<PreventivoModel[]>(`${environment.urlApi}/preventivo/list`);
  }

  getPage(idFornitore: number, pageIndex: number, pageSize: number){
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.get<PreventivoModel[]>(`${environment.urlApi}/preventivo/page/${idFornitore}`, {params});
  }

  getById(id: number): Observable<PreventivoModel>{
    return this.httpClient.get<PreventivoModel>(`${environment.urlApi}/preventivo/findbyid/${id}`);
  }

  salva(preventivo: any): Observable<Object>{
    return this.httpClient.post(`${environment.urlApi}/preventivo/nuovoModifica`, preventivo);
  }

  checkDelete(id: number): Observable<Boolean>{
    return this.httpClient.get<Boolean>(`${environment.urlApi}/preventivo/checkDelete/${id}`);
  }

  delete(id: number): Observable<Object>{
    return this.httpClient.delete(`${environment.urlApi}/preventivo/delete/${id}`);
  }
}
