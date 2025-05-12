import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transactions } from 'src/app/models/trasanctions';
import { TransactionDetails } from 'src/app/models/transactionDetails';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {
  sales: Transactions[] = [];
  saleDetails: TransactionDetails[] = [];
  selectedSaleId: number | null = null;
  totalSaleValue: number = 0;
  private transactionTypeId = 1; // Tipo de transacción para ventas

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadSales();
  }

  // Cargar todas las transacciones de tipo venta
  loadSales(): void {
    this.transactionService.getTransactionsByType(this.transactionTypeId).subscribe((transactions: Transactions[]) => {
      this.sales = transactions;
    });
  }

  // Cargar detalles de una venta específica y calcular total
  loadSaleDetails(saleId: number): void {
    this.transactionService.getTransactionDetailsByTransactionId(saleId).subscribe((details: TransactionDetails[]) => {
      this.saleDetails = details;
      this.totalSaleValue = this.calculateTotalValue(details);
    });
  }

  // Calcular el valor total de la venta sumando los valores de cada detalle
  calculateTotalValue(details: TransactionDetails[]): number {
    return details.reduce((sum, detail) => sum + (detail.total || 0), 0);
  }

  // Mostrar/Ocultar detalles de venta
  toggleDetails(saleId: number): void {
    if (this.selectedSaleId === saleId) {
      this.selectedSaleId = null;
    } else {
      this.selectedSaleId = saleId;
      this.loadSaleDetails(saleId);
    }
  }
}
