import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Horario } from '../models/HorarioModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiUrl: string = 'http://localhost:3000/api/horario';

  constructor( private http: HttpClient) { }

  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.apiUrl);
  }

  getHorario(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}/${id}`);
  }

  createHorario(model: Horario): Observable<Horario> {
    return this.http.post<Horario>(this.apiUrl, model);
  }

  updateHorario(id: number, model: Horario): Observable<Horario> {
    return this.http.put<Horario>(`${this.apiUrl}/${id}`, model);
  }

  deleteHorario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  restoreHorario(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${id}`, {});
  }
}
