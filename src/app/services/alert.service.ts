import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showSuccess(message: string = 'Operación realizada con éxito'): void {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
      showConfirmButton: true,
      position: 'center'
    });
  }

  showError(message: string = 'Ocurrió un error, intenta de nuevo'): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      showConfirmButton: true,
      position: 'center'
    });
  }
}
