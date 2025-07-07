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

  getInforme(Id: number): Observable<Informe> {
    return this.http.get<Informe>(`${this.apiUrl}/${Id}`);
  }

  createInforme(model: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, model);
  }

  updateInforme(Id: number, model: Informe): Observable<Informe> {
    return this.http.put<Informe>(`${this.apiUrl}/${Id}`, model);
  }

  deleteInforme(Id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${Id}`);
  }

  restoreInforme(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${Id}`, {});
  }
}
