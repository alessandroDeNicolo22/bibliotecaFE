import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpesaInvestimentoModel } from 'src/app/shared/model/spesainvestimento.model';
import { environment } from 'src/environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SpesaInvestimentoService {
  constructor(private httpClient: HttpClient) {}

  getListaPage(
    page: number,
    itemsPerPage: number
  ): Observable<SpesaInvestimentoModel[]> {
    const params = new HttpParams()
      .set('pageIndex', page.toString())
      .set('pageSize', itemsPerPage.toString());
    return this.httpClient.get<SpesaInvestimentoModel[]>(`${environment.urlApi}/spesainvestimento/listPage`,{ params }
    );
  }

  getLista(){
    return this.httpClient.get<SpesaInvestimentoModel[]>(`${environment.urlApi}/spesainvestimento/list`);
  }

  save(spesaInvestimento: SpesaInvestimentoModel): Observable<object> {
    return this.httpClient.post(`${environment.urlApi}/spesainvestimento/save`,spesaInvestimento
    );
  }
  
  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.urlApi}/spesainvestimento/delete/${id}`);
  }

  findById(id: number): Observable<SpesaInvestimentoModel> {
    return this.httpClient.get<SpesaInvestimentoModel>(`${environment.urlApi}/spesainvestimento/findbyid/${id}`
    );
  }

  checkDelete(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.urlApi}/spesainvestimento/checkDelete/${id}`);
  }

  getSpesaInvestimentoByIdSottoCategoria(id: number, pageIndex: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.httpClient.get<any>(
      `${environment.urlApi}/spesainvestimento/getPageBySottocategoria/${id}`,
      { params }
    );
  }
}