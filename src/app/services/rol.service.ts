import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol'; // Ajusta la ruta si es necesario
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private httpClient: HttpClient) { }

  // Obtener todos los roles
  getRoles(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(`${environment.urlApi}/roles`);
  }

  // Obtener un rol por ID
  getRolById(id: number): Observable<Rol> {
    return this.httpClient.get<Rol>(`${environment.urlApi}/roles/${id}`);
  }

  // Crear un nuevo rol
  createRol(rol: Rol): Observable<Rol> {
    return this.httpClient.post<Rol>(`${environment.urlApi}/roles`, rol);
  }

  // Actualizar un rol existente
  updateRol(id: number, rol: Rol): Observable<Rol> {
    return this.httpClient.put<Rol>(`${environment.urlApi}/roles/${id}`, rol);
  }

  // Eliminar un rol por ID
  deleteRol(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.urlApi}/roles/${id}`);
  }
}
