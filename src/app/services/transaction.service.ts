import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transactions } from '../models/trasanctions';
import { TransactionDetails } from '../models/transactionDetails';
import { TransactionTypes } from '../models/transactionTypes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = `${environment.urlApi}/transactions`;

  constructor(private http: HttpClient) {}

  // Obtener todas las transacciones
  getAllTransactions(): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(`${this.baseUrl}/all`);
  }

  // Obtener una transacción por ID
  getTransactionById(id: number): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.baseUrl}/${id}`);
  }

  // Obtener los detalles de una transacción específica
  getTransactionDetailsByTransactionId(
    id: number
  ): Observable<TransactionDetails[]> {
    return this.http.get<TransactionDetails[]>(`${this.baseUrl}/${id}/details`);
  }

  saveTransaction(
    transactionDetails: TransactionDetails[],
    buyerId: number,
    sellerId: number,
    transactionType: number
  ): Observable<Transactions> {
    const params = new HttpParams()
      .set('buyerId', buyerId.toString())
      .set('sellerId', sellerId.toString())
      .set('transactionType', transactionType.toString());

    return this.http.post<Transactions>(
      `${this.baseUrl}/save`,
      transactionDetails,
      { params }
    );
  }

  // Obtener transacciones por tipo de transacción
  getTransactionsByType(transactionTypeId: number): Observable<Transactions[]> {
    const params = new HttpParams().set(
      'transactionTypeId',
      transactionTypeId.toString()
    );
    return this.http.get<Transactions[]>(`${this.baseUrl}/by-type`, { params });
  }

  // Eliminar una transacción por ID
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
