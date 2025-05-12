import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';
import baserUrl from './helper';  // Importa el helper que contiene la URL base

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) { }

  // Obtener todos los stocks
  getAllStocks(): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(`${baserUrl}/stocks`);
  }

  // Obtener un stock por tienda y variación (ID compuesto)
  getStockById(storeId: number, variationCode: string): Observable<Stock> {
    return this.httpClient.get<Stock>(`${baserUrl}/stocks/${storeId}/${variationCode}`);
  }


  // Crear un nuevo stock
  createStock(stock: Stock): Observable<Stock> {
    return this.httpClient.post<Stock>(`${baserUrl}/stocks`, stock);
  }

  // Actualizar un stock existente
  updateStock(storeId: number, variationCode: string, stock: Stock): Observable<Stock> {
    return this.httpClient.put<Stock>(`${baserUrl}/stocks/${storeId}/${variationCode}`, stock);
  }


  // Eliminar un stock por tienda y variación (ID compuesto)
  deleteStock(storeId: number, variationCode: string): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/stocks/${storeId}/${variationCode}`);
  }


  // Obtener stocks por tienda
  getStockByStoreId(storeId: number): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(`${baserUrl}/stocks/store/${storeId}`);
  }

  // Obtener stocks por variación de producto
  getStockByVariationCode(variationCode: string): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(`${baserUrl}/stocks/variation/${variationCode}`);
  }

  // Descargar el reporte de Excel
  downloadExcelReport(): Observable<Blob> {
    return this.httpClient.get(`${baserUrl}/stocks/report`, {
      responseType: 'blob', // Indicamos que el backend devuelve un archivo binario
    });
  }
}
