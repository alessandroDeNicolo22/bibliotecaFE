import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenereModel } from 'src/app/shared/model/genere.model';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GenereService {

  constructor(private httpClient: HttpClient) { }

  getLista(): Observable<GenereModel[]> {
    return this.httpClient.get<GenereModel[]>(`${environment.urlApi}/genere/list`);
  }

  getPage(pageIndex: number, pageSize: number): Observable<GenereModel[]>{
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.get<GenereModel[]>(`${environment.urlApi}/genere/listpage`, {params});
  }

  getById(id: number): Observable<GenereModel>{
    return this.httpClient.get<GenereModel>(`${environment.urlApi}/genere/findbyid/${id}`);
  }

  salva(genere: any): Observable<Object> {
    return this.httpClient.post(`${environment.urlApi}/genere/save`, genere);
  }

  checkElimina(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.urlApi}/genere/check/${id}`);
  }

  elimina(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.urlApi}/genere/delete/${id}`);
  }
}