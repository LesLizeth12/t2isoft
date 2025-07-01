import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boleta } from '../models/BoletaModel';

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
  private apiUrl: string = 'http://localhost:3000/api/boleta';

  constructor( private http: HttpClient) { }

  getBoletas(): Observable<Boleta[]> {
    return this.http.get<Boleta[]>(this.apiUrl);
  }

  getBoleta(id: number): Observable<Boleta> {
    return this.http.get<Boleta>(`${this.apiUrl}/${id}`);
  }

  createBoleta(model: Boleta): Observable<Boleta> {
    return this.http.post<Boleta>(this.apiUrl, model);
  }

  updateBoleta(id: number, model: Boleta): Observable<Boleta> {
    return this.http.put<Boleta>(`${this.apiUrl}/${id}`, model);
  }

  deleteBoleta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  restoreBoleta(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${id}`, {});
  }
}
