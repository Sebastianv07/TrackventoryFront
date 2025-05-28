import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../models/form'; // Ajusta la ruta si es necesario
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private httpClient: HttpClient) {}

  // Obtener todos los formularios
  getForms(): Observable<Form[]> {
    return this.httpClient.get<Form[]>(`${environment.urlApi}/forms`);
  }

  // Obtener un formulario por URL
  getFormById(formId: number): Observable<Form> {
    return this.httpClient.get<Form>(`${environment.urlApi}/forms/${formId}`);
  }

  // Crear un nuevo formulario
  createForm(form: Form): Observable<Form> {
    return this.httpClient.post<Form>(`${environment.urlApi}/forms`, form);
  }

  // Actualizar un formulario existente
  updateForm(formId: number, form: Form): Observable<Form> {
    return this.httpClient.put<Form>(
      `${environment.urlApi}/forms/${formId}`,
      form
    );
  }

  // Eliminar un formulario por URL
  deleteForm(formId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.urlApi}/forms/${formId}`
    );
  }
}
