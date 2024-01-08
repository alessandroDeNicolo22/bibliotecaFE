import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaModel } from 'src/app/shared/model/area-model';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private httpClient: HttpClient) { }

  getLista(): Observable<AreaModel[]> {
    return this.httpClient.get<AreaModel[]>(`${environment.urlApi}/area/list`);
  }

  getPage(pageIndex: number, pageSize: number): Observable<AreaModel[]>{
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.get<AreaModel[]>(`${environment.urlApi}/area/listpage`, {params});
  }

  getById(idArea: number): Observable<AreaModel>{
    return this.httpClient.get<AreaModel>(`${environment.urlApi}/area/findbyid/${idArea}`);
  }

  salva(area: any): Observable<Object> {
    return this.httpClient.post(`${environment.urlApi}/area/nuovoModifica`, area);
  }

  checkElimina(idArea: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.urlApi}/area/checkElimina/${idArea}`);
  }

  elimina(idArea: number): Observable<any> {
    return this.httpClient.delete(`${environment.urlApi}/area/elimina/${idArea}`);
  }





}
