import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CasaEditriceModel } from 'src/app/shared/model/ce.model';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CasaEditriceService {

  constructor(private httpClient: HttpClient) { }

  getLista(): Observable<CasaEditriceModel[]> {
    return this.httpClient.get<CasaEditriceModel[]>(`${environment.urlApi}/ce/list`);
  }

  getPage(pageIndex: number, pageSize: number): Observable<CasaEditriceModel[]>{
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.get<CasaEditriceModel[]>(`${environment.urlApi}/ce/listpage`, {params});
  }

  getById(id: number): Observable<CasaEditriceModel>{
    return this.httpClient.get<CasaEditriceModel>(`${environment.urlApi}/ce/findbyid/${id}`);
  }

  save(aula: any): Observable<Object> {
    return this.httpClient.post(`${environment.urlApi}/ce/save`, aula);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.urlApi}/ce/delete/${id}`);
  }

  checkDelete(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.urlApi}/ce/checkDelete/${id}`);
  }
}
