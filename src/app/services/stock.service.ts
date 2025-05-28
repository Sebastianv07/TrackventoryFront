import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private httpClient: HttpClient) {}

  // Obtener todos los stocks
  getAllStocks(): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(`${environment.urlApi}/stocks`);
  }

  // Obtener un stock por tienda y variación (ID compuesto)
  getStockById(storeId: number, variationCode: string): Observable<Stock> {
    return this.httpClient.get<Stock>(
      `${environment.urlApi}/stocks/${storeId}/${variationCode}`
    );
  }

  // Crear un nuevo stock
  createStock(stock: Stock): Observable<Stock> {
    return this.httpClient.post<Stock>(`${environment.urlApi}/stocks`, stock);
  }

  // Actualizar un stock existente
  updateStock(
    storeId: number,
    variationCode: string,
    stock: Stock
  ): Observable<Stock> {
    return this.httpClient.put<Stock>(
      `${environment.urlApi}/stocks/${storeId}/${variationCode}`,
      stock
    );
  }

  // Eliminar un stock por tienda y variación (ID compuesto)
  deleteStock(storeId: number, variationCode: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.urlApi}/stocks/${storeId}/${variationCode}`
    );
  }

  // Obtener stocks por tienda
  getStockByStoreId(storeId: number): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(
      `${environment.urlApi}/stocks/store/${storeId}`
    );
  }

  // Obtener stocks por variación de producto
  getStockByVariationCode(variationCode: string): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(
      `${environment.urlApi}/stocks/variation/${variationCode}`
    );
  }

  // Descargar el reporte de Excel
  downloadExcelReport(): Observable<Blob> {
    return this.httpClient.get(`${environment.urlApi}/stocks/report`, {
      responseType: 'blob', // Indicamos que el backend devuelve un archivo binario
    });
  }
}
