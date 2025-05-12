import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../models/form'; // Ajusta la ruta si es necesario
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private httpClient: HttpClient) { }

  // Obtener todos los formularios
  getForms(): Observable<Form[]> {
    return this.httpClient.get<Form[]>(`${baserUrl}/forms`);
  }

  // Obtener un formulario por URL
  getFormById(formId: number): Observable<Form> {
    return this.httpClient.get<Form>(`${baserUrl}/forms/${formId}`);
  }

  // Crear un nuevo formulario
  createForm(form: Form): Observable<Form> {
    return this.httpClient.post<Form>(`${baserUrl}/forms`, form);
  }

  // Actualizar un formulario existente
  updateForm(formId: number, form: Form): Observable<Form> {
    return this.httpClient.put<Form>(`${baserUrl}/forms/${formId}`, form);
  }

  // Eliminar un formulario por URL
  deleteForm(formId: number): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/forms/${formId}`);
  }
}
