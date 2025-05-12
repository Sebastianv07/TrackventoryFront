import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale';
import { SaleDetail } from '../models/saleDetail';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private baseUrl = 'http://localhost:8080/sales'; // Cambia esto a la URL base de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener todas las ventas
  getAllSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.baseUrl}/all`);
  }

  // Método para obtener una venta por ID
  getSaleById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.baseUrl}/${id}`);
  }

  // Método para obtener los detalles de una venta específica
  getSaleDetailsBySaleId(id: number): Observable<SaleDetail[]> {
    return this.http.get<SaleDetail[]>(`${this.baseUrl}/${id}/details`);
  }

  // Método para guardar o actualizar una venta
  saveSale(saleDetails: SaleDetail[]): Observable<Sale> {
    return this.http.post<Sale>(`${this.baseUrl}/save`, saleDetails);
  }  

  // Método para eliminar una venta por ID
  deleteSale(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
