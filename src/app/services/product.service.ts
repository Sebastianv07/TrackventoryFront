import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.urlApi}/products`);
  }

  getProductByReference(reference: string): Observable<Product> {
    return this.httpClient.get<Product>(
      `${environment.urlApi}/products/${reference}`
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(
      `${environment.urlApi}/products`,
      product
    );
  }

  updateProduct(reference: string, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      `${environment.urlApi}/products/${reference}`,
      product
    );
  }

  deleteProduct(reference: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.urlApi}/products/${reference}`
    );
  }

  // Nuevo método para obtener productos filtrados
  getFilteredProducts(
    reference?: string,
    name?: string,
    price?: number,
    categoryId?: number
  ): Observable<Product[]> {
    let params = new HttpParams();

    // Agregar los parámetros solo si están definidos
    if (reference) {
      params = params.set('reference', reference);
    }
    if (name) {
      params = params.set('name', name);
    }
    if (price !== undefined && price !== null) {
      params = params.set('price', price.toString());
    }
    if (categoryId) {
      params = params.set('categoryId', categoryId.toString());
    }

    // Llamada HTTP con los parámetros de búsqueda
    return this.httpClient.get<Product[]>(`${environment.urlApi}/products`, {
      params,
    });
  }
}
