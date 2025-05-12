import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductVariation } from '../models/productVariation';
import baserUrl from './helper'; 

@Injectable({
  providedIn: 'root'
})
export class ProductVariationService {

  constructor(private httpClient: HttpClient) { }

  getProductVariationsByProductReference(reference: string): Observable<ProductVariation[]> {
    return this.httpClient.get<ProductVariation[]>(`${baserUrl}/product-variations/product/${reference}`);
  }

  getProductVariations(): Observable<ProductVariation[]> {
    return this.httpClient.get<ProductVariation[]>(`${baserUrl}/product-variations`);
  }

  createProductVariation(productVariation: ProductVariation): Observable<ProductVariation> {
    return this.httpClient.post<ProductVariation>(`${baserUrl}/product-variations`, productVariation);
  }

  updateProductVariation(code: string, productVariation: ProductVariation): Observable<ProductVariation> {
    return this.httpClient.put<ProductVariation>(`${baserUrl}/product-variations/${code}`, productVariation);
  }

  deleteProductVariation(code: string): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/product-variations/${code}`);
  }
}
