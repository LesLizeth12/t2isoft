import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Informe } from '../models/InformeModel';

@Injectable({
  providedIn: 'root'
})
export class InformeService {
  private apiUrl: string = 'http://localhost:3000/api/informe';

  constructor( private http: HttpClient) { }

  getInformes(): Observable<Informe[]> {
    return this.http.get<Informe[]>(this.apiUrl);
  }

  getInforme(id: number): Observable<Informe> {
    return this.http.get<Informe>(`${this.apiUrl}/${id}`);
  }

  createInforme(model: Informe): Observable<Informe> {
    return this.http.post<Informe>(this.apiUrl, model);
  }

  updateInforme(id: number, model: Informe): Observable<Informe> {
    return this.http.put<Informe>(`${this.apiUrl}/${id}`, model);
  }

  deleteInforme(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  restoreInforme(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${id}`, {});
  }
}
