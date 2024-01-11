import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibroModel } from 'src/app/shared/model/libro.model';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private httpClient: HttpClient) { }

  getLista(): Observable<LibroModel[]> {
    return this.httpClient.get<LibroModel[]>(`${environment.urlApi}/libro/list`);
  }

  getPage(pageIndex: number, pageSize: number): Observable<LibroModel[]>{
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.get<LibroModel[]>(`${environment.urlApi}/libro/listpage`, {params});
  }

  getById(id: number): Observable<LibroModel>{
    return this.httpClient.get<LibroModel>(`${environment.urlApi}/libro/findbyid/${id}`);
  }

  save(aula: any): Observable<Object> {
    return this.httpClient.post(`${environment.urlApi}/libro/save`, aula);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.urlApi}/libro/delete/${id}`);
  }

  checkDelete(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.urlApi}/libro/checkDelete/${id}`);
  }
}
