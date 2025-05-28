import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../models/productCategory'; // Modelo de categoría
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${environment.urlApi}/categories`;

  constructor(private httpClient: HttpClient) { }

  // Obtener todas las categorías
  getCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.apiUrl);
  }

  // Obtener una categoría por ID
  getCategoryById(id: number): Observable<ProductCategory> {
    return this.httpClient.get<ProductCategory>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva categoría
  createCategory(category: ProductCategory): Observable<ProductCategory> {
    return this.httpClient.post<ProductCategory>(this.apiUrl, category);
  }

  // Actualizar una categoría existente
  updateCategory(id: number, category: ProductCategory): Observable<ProductCategory> {
    return this.httpClient.put<ProductCategory>(`${this.apiUrl}/${id}`, category);
  }

  // Eliminar una categoría por ID
  deleteCategory(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
