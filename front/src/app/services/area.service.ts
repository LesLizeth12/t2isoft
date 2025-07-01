import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../models/AreaModel';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl: string = 'http://localhost:3000/api/area';

  constructor( private http: HttpClient) { }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl);
  }

  getArea(id: number): Observable<Area> {
    return this.http.get<Area>(`${this.apiUrl}/${id}`);
  }

  createArea(model: Area): Observable<Area> {
    return this.http.post<Area>(this.apiUrl, model);
  }

  updateArea(id: number, model: Area): Observable<Area> {
    return this.http.put<Area>(`${this.apiUrl}/${id}`, model);
  }

  deleteArea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  restoreArea(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${id}`, {});
  }
}
