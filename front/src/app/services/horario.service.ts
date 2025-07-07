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

  getHorariosByIdEstacion(estacionId: number): Observable<Horario[]> {
      const url = `${this.apiUrl}/estacion/${estacionId}`;
      return this.http.get<Horario[]>(url);
    }

  getHorario(Id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}/${Id}`);
  }

  createHorario(model: Horario): Observable<Horario> {
    return this.http.post<Horario>(this.apiUrl, model);
  }

  updateHorario(Id: number, model: Horario): Observable<Horario> {
    return this.http.put<Horario>(`${this.apiUrl}/${Id}`, model);
  }

  deleteHorario(Id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${Id}`);
  }

  restoreHorario(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${Id}`, {});
  }
}
