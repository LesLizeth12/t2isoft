import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoUsuario } from '../models/TipoUsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class TipousuarioService {
  private apiUrl: string = 'http://localhost:3000/api/tipoUsuario';

  constructor( private http: HttpClient) { }

  getTipoUsuarios(): Observable<TipoUsuario[]> {
    return this.http.get<TipoUsuario[]>(this.apiUrl);
  }

  getTipoUsuario(Id: number): Observable<TipoUsuario> {
    return this.http.get<TipoUsuario>(`${this.apiUrl}/${Id}`);
  }

  createTipoUsuario(model: TipoUsuario): Observable<TipoUsuario> {
    return this.http.post<TipoUsuario>(this.apiUrl, model);
  }

  updateTipoUsuario(Id: number, model: TipoUsuario): Observable<TipoUsuario> {
    return this.http.put<TipoUsuario>(`${this.apiUrl}/${Id}`, model);
  }

  deleteTipoUsuario(Id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${Id}`);
  }

  restoreTipoUsuario(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${Id}`, {});
  }
}
