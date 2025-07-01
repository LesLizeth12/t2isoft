import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preferencia } from '../models/PreferenciaModel';

@Injectable({
  providedIn: 'root'
})
export class PreferenciaService {
  private apiUrl: string = 'http://localhost:3000/api/preferencia';

  constructor( private http: HttpClient) { }

  getPreferencias(): Observable<Preferencia[]> {
    return this.http.get<Preferencia[]>(this.apiUrl);
  }

  getPreferencia(id: number): Observable<Preferencia> {
    return this.http.get<Preferencia>(`${this.apiUrl}/${id}`);
  }

  createPreferencia(model: Preferencia): Observable<Preferencia> {
    return this.http.post<Preferencia>(this.apiUrl, model);
  }

  updatePreferencia(id: number, model: Preferencia): Observable<Preferencia> {
    return this.http.put<Preferencia>(`${this.apiUrl}/${id}`, model);
  }

  deletePreferencia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  restorePreferencia(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${id}`, {});
  }
}
