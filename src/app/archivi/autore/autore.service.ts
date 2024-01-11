import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoreModel } from 'src/app/shared/model/autore-model';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AutoreService {

  constructor(private httpClient: HttpClient) { }

  getLista(): Observable<AutoreModel[]> {
    return this.httpClient.get<AutoreModel[]>(`${environment.urlApi}/autore/list`);
  }

  getPage(pageIndex: number, pageSize: number): Observable<AutoreModel[]>{
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.get<AutoreModel[]>(`${environment.urlApi}/autore/listpage`, {params});
  }

  getById(id: number): Observable<AutoreModel>{
    return this.httpClient.get<AutoreModel>(`${environment.urlApi}/autore/findbyid/${id}`);
  }

  save(aula: any): Observable<Object> {
    return this.httpClient.post(`${environment.urlApi}/autore/save`, aula);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.urlApi}/autore/delete/${id}`);
  }

  checkDelete(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.urlApi}/autore/check/${id}`);
  }
}
