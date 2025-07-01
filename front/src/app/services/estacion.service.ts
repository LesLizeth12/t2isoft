import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estacion } from '../models/EstacionModel';

@Injectable({
  providedIn: 'root'
})
export class EstacionService {
  private apiUrl: string = 'http://localhost:3000/api/estacion';

  constructor( private http: HttpClient) { }

  getEstacions(): Observable<Estacion[]> {
    return this.http.get<Estacion[]>(this.apiUrl);
  }

  getEstacion(id: number): Observable<Estacion> {
    return this.http.get<Estacion>(`${this.apiUrl}/${id}`);
  }

  createEstacion(model: Estacion): Observable<Estacion> {
    return this.http.post<Estacion>(this.apiUrl, model);
  }

  updateEstacion(id: number, model: Estacion): Observable<Estacion> {
    return this.http.put<Estacion>(`${this.apiUrl}/${id}`, model);
  }

  deleteEstacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  restoreEstacion(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${id}`, {});
  }
}
