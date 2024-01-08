import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FornitoreModel } from 'src/app/shared/model/fornitore.model';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FornitoreService {

  constructor(private httpClient: HttpClient) { }

  getLista(): Observable<FornitoreModel[]> {
    return this.httpClient.get<FornitoreModel[]>(`${environment.urlApi}/fornitore/list`);
  }

  getPage(pageIndex: number, pageSize: number): Observable<FornitoreModel[]>{
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.get<FornitoreModel[]>(`${environment.urlApi}/fornitore/listpage`, {params});
  }

  getById(id: number): Observable<FornitoreModel>{
    return this.httpClient.get<FornitoreModel>(`${environment.urlApi}/fornitore/findbyid/${id}`);
  }

  salva(fornitore: any): Observable<Object> {
    return this.httpClient.post(`${environment.urlApi}/fornitore/save`, fornitore);
  }

  checkElimina(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.urlApi}/fornitore/check/${id}`);
  }

  elimina(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.urlApi}/fornitore/delete/${id}`);
  }
}