import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionTypesService } from 'src/app/services/transaction-types.service';

import { AlertService } from 'src/app/services/alert.service';
import { TransactionTypes } from 'src/app/models/transactionTypes';

@Component({
  selector: 'app-transaction-types-create-edit',
  templateUrl: './transaction-types-create-edit.component.html',
  styleUrls: ['./transaction-types-create-edit.component.css']
})
export class TransactionTypeCreateEditComponent implements OnInit {

  transactionType: TransactionTypes = {
    id: 0,
    name: '',
    description: ''
  };

  editMode = false;

  constructor(
    private transactionTypesService: TransactionTypesService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id !== null && !isNaN(id)) {
      this.editMode = true;
      this.transactionTypesService.getTransactionTypeById(id).subscribe({
        next: (data: TransactionTypes) => {
          this.transactionType = data;
        },
        error: (err) => {
          console.error('Error al cargar el tipo de transacción', err);
          this.alertService.showError();
        }
      });
    }
  }

  onSubmit(): void {
    if (this.editMode) {
      this.transactionTypesService.updateTransactionType(this.transactionType.id, this.transactionType).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/transactionTypes']);
        },
        error: (err) => {
          console.error('Error actualizando el tipo de transacción', err);
          this.alertService.showError();
        }
      });
    } else {
      this.transactionTypesService.createTransactionType(this.transactionType).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/transactionTypes']);
        },
        error: (err) => {
          console.error('Error creando el tipo de transacción', err);
          this.alertService.showError();
        }
      });
    }
  }
}
