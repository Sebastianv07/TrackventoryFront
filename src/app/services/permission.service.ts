import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from '../models/permission'; // Ajusta la ruta si es necesario
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private httpClient: HttpClient) { }

  // Obtener un permiso por ID compuesto (profileId y formUrl)
  getPermissionById(profileId: number, formId: number): Observable<Permission> {
    return this.httpClient.get<Permission>(`${environment.urlApi}/permissions/${profileId}/${formId}`);
  }

  // Crear un nuevo permiso
  createPermission(permission: Permission): Observable<Permission> {
    return this.httpClient.post<Permission>(`${environment.urlApi}/permissions`, permission);
  }

  // Eliminar un permiso por ID compuesto (profileId y formUrl)
  deletePermission(profileId: number, formId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.urlApi}/permissions/${profileId}/${formId}`);
  }

  // Obtener permisos por perfil
  getPermissionsByProfile(profileId: number): Observable<Permission[]> {
    return this.httpClient.get<Permission[]>(`${environment.urlApi}/permissions/profile/${profileId}`);
  }
}
