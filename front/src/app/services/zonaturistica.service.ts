import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZonaTuristica } from '../models/ZonaTuristicaModel';

@Injectable({
  providedIn: 'root'
})
export class ZonaturisticaService {
  private apiUrl: string = 'http://localhost:3000/api/zonaTuristica';

  constructor( private http: HttpClient) { }

  getZonaTuristicas(): Observable<ZonaTuristica[]> {
    return this.http.get<ZonaTuristica[]>(this.apiUrl);
  }

  getZonasByIdEstacion(estacionId: number): Observable<ZonaTuristica[]> {
    const url = `${this.apiUrl}/estacion/${estacionId}`;
    return this.http.get<ZonaTuristica[]>(url);
  }

  getZonaTuristica(Id: number): Observable<ZonaTuristica> {
    return this.http.get<ZonaTuristica>(`${this.apiUrl}/${Id}`);
  }

  createZonaTuristica(model: ZonaTuristica): Observable<ZonaTuristica> {
    return this.http.post<ZonaTuristica>(this.apiUrl, model);
  }

  updateZonaTuristica(Id: number, model: ZonaTuristica): Observable<ZonaTuristica> {
    return this.http.put<ZonaTuristica>(`${this.apiUrl}/${Id}`, model);
  }

  deleteZonaTuristica(Id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${Id}`);
  }

  restoreZonaTuristica(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${Id}`, {});
  }
}
