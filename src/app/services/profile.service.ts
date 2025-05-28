import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile'; // Ajusta la ruta si es necesario
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  // Obtener todos los perfiles
  getProfiles(): Observable<Profile[]> {
    return this.httpClient.get<Profile[]>(`${environment.urlApi}/profiles`);
  }

  // Obtener un perfil por ID
  getProfileById(id: number): Observable<Profile> {
    return this.httpClient.get<Profile>(`${environment.urlApi}/profiles/${id}`);
  }

  // Crear un nuevo perfil
  createProfile(profile: Profile): Observable<Profile> {
    return this.httpClient.post<Profile>(
      `${environment.urlApi}/profiles`,
      profile
    );
  }

  // Actualizar un perfil existente
  updateProfile(id: number, profile: Profile): Observable<Profile> {
    return this.httpClient.put<Profile>(
      `${environment.urlApi}/profiles/${id}`,
      profile
    );
  }

  // Eliminar un perfil por ID
  deleteProfile(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.urlApi}/profiles/${id}`);
  }
}
