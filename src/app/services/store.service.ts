import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getStores(): Observable<Store[]> {
    return this.httpClient.get<Store[]>(`${environment.urlApi}/stores`);
  }

  getStoreById(id: number): Observable<Store> {
    return this.httpClient.get<Store>(`${environment.urlApi}/stores/${id}`);
  }

  createStore(store: Store): Observable<Store> {
    return this.httpClient.post<Store>(`${environment.urlApi}/stores`, store);
  }

  updateStore(id: number, store: Store): Observable<Store> {
    return this.httpClient.put<Store>(
      `${environment.urlApi}/stores/${id}`,
      store
    );
  }

  deleteStore(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.urlApi}/stores/${id}`);
  }
}
