import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from '../models/color'; // Ajusta la ruta si es necesario
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }

  // Obtener todos los colores
  getColors(): Observable<Color[]> {
    return this.httpClient.get<Color[]>(`${baserUrl}/colors`);
  }

  // Obtener un color por nombre
  getColorById(id: number): Observable<Color> {
    return this.httpClient.get<Color>(`${baserUrl}/colors/${id}`);
  }

  // Crear un nuevo color
  createColor(color: Color): Observable<Color> {
    return this.httpClient.post<Color>(`${baserUrl}/colors`, color);
  }

  // Actualizar un color existente
  updateColor(id: number, color: Color): Observable<Color> {
    return this.httpClient.put<Color>(`${baserUrl}/colors/${id}`, color);
  }

  // Eliminar un color por id
  deleteColor(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/colors/${id}`);
  }
}
