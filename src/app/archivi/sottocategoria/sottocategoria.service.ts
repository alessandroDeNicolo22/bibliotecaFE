import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaModel } from 'src/app/shared/model/area.model';
import { SottocategoriaModel } from 'src/app/shared/model/sottocategoria.model';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SottocategoriaService {

  constructor(private httpClient: HttpClient) { }

  getLista(): Observable<SottocategoriaModel[]> {
    return this.httpClient.get<SottocategoriaModel[]>(`${environment.urlApi}/sottocategoria/list`);
  }

  getPage(pageIndex: number, pageSize: number): Observable<SottocategoriaModel[]>{
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.get<SottocategoriaModel[]>(`${environment.urlApi}/sottocategoria/listpage`, {params});
  }

  getById(id: number): Observable<SottocategoriaModel>{
    return this.httpClient.get<SottocategoriaModel>(`${environment.urlApi}/sottocategoria/findbyid/${id}`);
  }

  salva(sottocategoria: any): Observable<Object> {
    return this.httpClient.post(`${environment.urlApi}/sottocategoria/save`, sottocategoria);
  }

  checkElimina(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.urlApi}/sottocategoria/check/${id}`);
  }

  elimina(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.urlApi}/sottocategoria/delete/${id}`);
  }

  getAree():Observable<AreaModel[]>{
    return this.httpClient.get<AreaModel[]>(`${environment.urlApi}/area/list`);
  }

  ricercaPage(id:number,pageIndex: number, pageSize: number): Observable<SottocategoriaModel[]>{
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.post<SottocategoriaModel[]>(`${environment.urlApi}/sottocategoria/listbyarea`,id,{params});
  }

  riconciliazione(firstDate:string, endDate:string):Observable<any>{
    const params = new HttpParams()
    .set('firstDate',firstDate)
    .set('endDate',endDate)
    return this.httpClient.post(`${environment.urlApi}/sottocategoria/riconciliazione`,null,{params});
  }
}