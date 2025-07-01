import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clima } from '../models/ClimaModel';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiUrl: string = 'http://localhost:3000/api/clima';

  constructor( private http: HttpClient) { }

  getClimas(): Observable<Clima[]> {
    return this.http.get<Clima[]>(this.apiUrl);
  }

  getClima(id: number): Observable<Clima> {
    return this.http.get<Clima>(`${this.apiUrl}/${id}`);
  }

  createClima(model: Clima): Observable<Clima> {
    return this.http.post<Clima>(this.apiUrl, model);
  }

  updateClima(id: number, model: Clima): Observable<Clima> {
    return this.http.put<Clima>(`${this.apiUrl}/${id}`, model);
  }

  deleteClima(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  restoreClima(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${id}`, {});
  }
}
