import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AliquotaivaModel } from 'src/app/shared/model/aliquotaiva.model';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AliquotaService {

  constructor(private httpClient: HttpClient) { }

  getLista(): Observable<AliquotaivaModel[]> {
    return this.httpClient.get<AliquotaivaModel[]>(`${environment.urlApi}/aliquotaiva/list`);
  }

  getPage(pageIndex: number, pageSize: number): Observable<AliquotaivaModel[]>{
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.get<AliquotaivaModel[]>(`${environment.urlApi}/aliquotaiva/listpage`, {params});
  }

  getById(id: number): Observable<AliquotaivaModel>{
    return this.httpClient.get<AliquotaivaModel>(`${environment.urlApi}/aliquotaiva/findbyid/${id}`);
  }

  salva(aula: any): Observable<Object> {
    return this.httpClient.post(`${environment.urlApi}/aliquotaiva/save`, aula);
  }

  checkElimina(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.urlApi}/aliquotaiva/check/${id}`);
  }

  elimina(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.urlApi}/aliquotaiva/delete/${id}`);
  }
}
