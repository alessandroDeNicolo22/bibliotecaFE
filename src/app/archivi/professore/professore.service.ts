import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfessoreModel } from 'src/app/shared/model/professore-model';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfessoreService {

  constructor(private httpClient: HttpClient) { }

  getLista(): Observable<ProfessoreModel[]> {
    return this.httpClient.get<ProfessoreModel[]>(`${environment.urlApi}/professore/list`);
  }

  getPage(pageIndex: number, pageSize: number): Observable<ProfessoreModel[]>{
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString())
    return this.httpClient.get<ProfessoreModel[]>(`${environment.urlApi}/professore/listpage`, {params});
  }

  getById(idProfessore: number): Observable<ProfessoreModel>{
    return this.httpClient.get<ProfessoreModel>(`${environment.urlApi}/professore/findbyid/${idProfessore}`);
  }

  salva(professore: any): Observable<Object> {
    return this.httpClient.post(`${environment.urlApi}/professore/nuovoModifica`, professore);
  }

  checkElimina(idProfessore: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.urlApi}/professore/check/${idProfessore}`);
  }

  elimina(idProfessore: number): Observable<any> {
    return this.httpClient.delete(`${environment.urlApi}/professore/delete/${idProfessore}`);
  }
}
