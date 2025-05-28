import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductVariation } from '../models/productVariation';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductVariationService {

  constructor(private httpClient: HttpClient) { }

  getProductVariationsByProductReference(reference: string): Observable<ProductVariation[]> {
    return this.httpClient.get<ProductVariation[]>(`${environment.urlApi}/product-variations/product/${reference}`);
  }

  getProductVariations(): Observable<ProductVariation[]> {
    return this.httpClient.get<ProductVariation[]>(`${environment.urlApi}/product-variations`);
  }

  createProductVariation(productVariation: ProductVariation): Observable<ProductVariation> {
    return this.httpClient.post<ProductVariation>(`${environment.urlApi}/product-variations`, productVariation);
  }

  updateProductVariation(code: string, productVariation: ProductVariation): Observable<ProductVariation> {
    return this.httpClient.put<ProductVariation>(`${environment.urlApi}/product-variations/${code}`, productVariation);
  }

  deleteProductVariation(code: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.urlApi}/product-variations/${code}`);
  }
}
