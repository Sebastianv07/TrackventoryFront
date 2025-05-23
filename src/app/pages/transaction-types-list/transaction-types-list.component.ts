import { Component, OnInit } from '@angular/core';
import { TransactionTypesService } from 'src/app/services/transaction-types.service';

import { AlertService } from 'src/app/services/alert.service';
import { TransactionTypes } from 'src/app/models/transactionTypes';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-transaction-types-list',
  templateUrl: './transaction-types-list.component.html',
  styleUrls: ['./transaction-types-list.component.css'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'translateY(10px)' })
        ),
      ]),
    ]),
  ],
})
export class TransactionTypesListComponent implements OnInit {
  transactionTypes: TransactionTypes[] = [];

  constructor(
    private transactionTypesService: TransactionTypesService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadTransactionTypes();
  }

  loadTransactionTypes(): void {
    this.transactionTypesService.getTransactionTypes().subscribe(
      (data: TransactionTypes[]) => {
        this.transactionTypes = data;
      },
      (error) => {
        console.error('Error al cargar los tipos de transacción', error);
        this.alertService.showError();
      }
    );
  }

  deleteTransactionType(id: number): void {
    this.transactionTypesService.deleteTransactionType(id).subscribe(
      () => {
        this.transactionTypes = this.transactionTypes.filter(
          (type) => type.id !== id
        );
        this.alertService.showSuccess();
      },
      (error) => {
        console.error('Error al eliminar el tipo de transacción', error);
        this.alertService.showError();
      }
    );
  }
}
