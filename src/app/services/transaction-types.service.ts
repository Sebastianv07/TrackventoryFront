import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionTypes } from '../models/transactionTypes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionTypesService {
  constructor(private httpClient: HttpClient) {}

  // Obtener todos los tipos de transacción
  getTransactionTypes(): Observable<TransactionTypes[]> {
    return this.httpClient.get<TransactionTypes[]>(
      `${environment.urlApi}/transactionTypes`
    );
  }

  // Obtener un tipo de transacción por ID
  getTransactionTypeById(id: number): Observable<TransactionTypes> {
    return this.httpClient.get<TransactionTypes>(
      `${environment.urlApi}/transactionTypes/${id}`
    );
  }

  // Crear un nuevo tipo de transacción
  createTransactionType(
    transactionType: TransactionTypes
  ): Observable<TransactionTypes> {
    return this.httpClient.post<TransactionTypes>(
      `${environment.urlApi}/transactionTypes`,
      transactionType
    );
  }

  // Actualizar un tipo de transacción existente
  updateTransactionType(
    id: number,
    transactionType: TransactionTypes
  ): Observable<TransactionTypes> {
    return this.httpClient.put<TransactionTypes>(
      `${environment.urlApi}/transactionTypes/${id}`,
      transactionType
    );
  }

  // Eliminar un tipo de transacción por ID
  deleteTransactionType(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.urlApi}/transactionTypes/${id}`
    );
  }
}
