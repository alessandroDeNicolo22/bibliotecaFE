import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment.development';
import { UtenteModel } from '../shared/model/utente.model';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }
  private jwtHelper: JwtHelperService = new JwtHelperService();
  protected token: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public tokenObservable(): Observable<string | null> {
    return this.token.asObservable();
  }

  isLogged() {
    if (this.getTokenValue() !== null) {
      return true;
    } else {
      return false;
    }
  }
  getTokenValue() {
    return localStorage.getItem('token');
  }

  getLista(): Observable<UtenteModel[]> {
    return this.httpClient.get<UtenteModel[]>(`${environment.urlApi}/utente/list`);
  }

  getPage(pageIndex: number, pageSize: number): Observable<UtenteModel[]> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
    return this.httpClient.get<UtenteModel[]>(`${environment.urlApi}/utente/paginatedlist`, { params });
  }

  getById(id: number): Observable<UtenteModel> {
    return this.httpClient.get<UtenteModel>(`${environment.urlApi}/utente/findbyid/${id}`);
  }

  salva(utente: any): Observable<Object> {
    return this.httpClient.post(`${environment.urlApi}/utente/nuovoModifica`, utente);
  }

  elimina(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.urlApi}/utente/elimina/${id}`);
  }

  findByEmail(email: string): Observable<UtenteModel> {
    return this.httpClient.get<UtenteModel>(`${environment.urlApi}/utente/findbyemail/${email}`)
  }

  auth(object: any): Observable<Object> {
    return this.httpClient.post<any>(`${environment.urlApi}/auth/authenticate`, object).pipe(map(result => {
      const token = result.token;
      this.token.next(token);
      localStorage.setItem('token', token);
      return token;
    })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.token.next(null);
  }

  isAdmin(): boolean {
    const token = this.getTokenValue();
    if (token !== null) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      if (decodedToken.role === 'ROLE_ADMIN') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  isSupervisorOrAbove() {
    const token = this.getTokenValue();
    if (token !== null) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      if (decodedToken.role === 'ROLE_ADMIN' || decodedToken.role === 'ROLE_SUPERVISOR') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
  checkEmail(object: UtenteModel): Observable<Boolean> {
    return this.httpClient.post<Boolean>(`${environment.urlApi}/utente/checkEmail`, object);
  }

  isSessionExpired(): boolean {
    const token = this.getTokenValue();
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      const expirationDate = decodedToken.exp;
      const currentTime = Date.now() / 1000;
      return expirationDate < currentTime;
    } else {
      return true;
    }
  }
  
  getEmailFromToken(): string | null {
    const token = this.getTokenValue();
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.sub;
    } else {
      return null;
    }
  }

  verifyPassword(id: number, password: string): Observable<Boolean> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('password', password.toString())
    return this.httpClient.get<Boolean>(`${environment.urlApi}/utente/verifyPassword`, { params });
  }

  modifyPassword(id: number, password: string): Observable<Object> {
    const params = new HttpParams()
      .set('password', password.toString())
    return this.httpClient.post(`${environment.urlApi}/utente/modifyPassword`, id, { params });
  }

}