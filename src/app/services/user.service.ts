import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public añadirUsuario(user: any) {
    return this.httpClient.post(`${environment.urlApi}/users/`, user);
  }
}
