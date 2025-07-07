import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl: string = 'http://localhost:3000/api/usuario';

  constructor( private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuario(Id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${Id}`);
  }

  createUsuario(model: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, model);
  }

  updateUsuario(Id: number, model: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${Id}`, model);
  }

  deleteUsuario(Id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${Id}`);
  }

  restoreUsuario(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${Id}`, {});
  }

  login(UsuNombre: string): Observable<Usuario>{
    return this.http.get<Usuario>(this.apiUrl+"/getusername/"+UsuNombre);
  }
}
