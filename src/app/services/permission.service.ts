import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from '../models/permission'; // Ajusta la ruta si es necesario
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private httpClient: HttpClient) { }

  // Obtener un permiso por ID compuesto (profileId y formUrl)
  getPermissionById(profileId: number, formId: number): Observable<Permission> {
    return this.httpClient.get<Permission>(`${baserUrl}/permissions/${profileId}/${formId}`);
  }

  // Crear un nuevo permiso
  createPermission(permission: Permission): Observable<Permission> {
    return this.httpClient.post<Permission>(`${baserUrl}/permissions`, permission);
  }

  // Eliminar un permiso por ID compuesto (profileId y formUrl)
  deletePermission(profileId: number, formId: number): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/permissions/${profileId}/${formId}`);
  }

  // Obtener permisos por perfil
  getPermissionsByProfile(profileId: number): Observable<Permission[]> {
    return this.httpClient.get<Permission[]>(`${baserUrl}/permissions/profile/${profileId}`);
  }
}
