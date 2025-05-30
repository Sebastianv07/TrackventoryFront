import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transactions } from 'src/app/models/trasanctions';
import { TransactionDetails } from 'src/app/models/transactionDetails';
import { trigger, transition, style, animate } from '@angular/animations';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { Sale } from 'src/app/models/sale';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css'],
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
export class SaleListComponent implements OnInit {
  sales: Transactions[] = [];
  saleDetails: TransactionDetails[] = [];
  selectedSaleId: number | null = null;
  totalSaleValue: number = 0;
  private transactionTypeId = 1;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.transactionService
      .getTransactionsByType(this.transactionTypeId)
      .subscribe((transactions: Transactions[]) => {
        this.sales = transactions;
      });
  }

  loadSaleDetails(saleId: number): void {
    this.transactionService
      .getTransactionDetailsByTransactionId(saleId)
      .subscribe((details: TransactionDetails[]) => {
        this.saleDetails = details;
        this.totalSaleValue = this.calculateTotalValue(details);
      });
  }

  calculateTotalValue(details: TransactionDetails[]): number {
    return details.reduce((sum, detail) => sum + (detail.total || 0), 0);
  }

  toggleDetails(saleId: number): void {
    if (this.selectedSaleId === saleId) {
      this.selectedSaleId = null;
    } else {
      this.selectedSaleId = saleId;
      this.loadSaleDetails(saleId);
    }
  }

  downloadSalePDF(sale: Transactions): void {
    this.transactionService
      .getTransactionDetailsByTransactionId(sale.id)
      .subscribe({
        next: (details: TransactionDetails[]) => {
          const doc = new jsPDF();
          let y = 10;
          doc.text('DETALLE DE VENTA', 10, y);
          y += 10;

          doc.text(`ID: ${sale.id}`, 10, y);
          y += 10;
          doc.text(`Fecha: ${sale.date}`, 10, y);
          y += 10;
          doc.text(`Total: ${this.calculateTotalValue(details)}`, 10, y);
          y += 10;

          doc.text('Detalles:', 10, y);
          y += 10;

          details.forEach((detail, index) => {
            const unitPrice =
              detail.quantity > 0
                ? (detail.total / detail.quantity).toFixed(2)
                : '0.00';
            doc.text(
              `${index + 1}., Cantidad: ${
                detail.quantity
              }, Precio Unitario: ${unitPrice}, Total: ${detail.total}`,
              10,
              y
            );
            y += 10;
            if (y > 270) {
              doc.addPage();
              y = 10;
            }
          });

          doc.save(`venta_${sale.id}.pdf`);
        },
        error: (err) => console.error('Error al obtener detalles:', err),
      });
  }

  downloadPDF(): void {
    const doc = new jsPDF();
    let y = 10;

    doc.text('INFORME COMPLETO DE VENTAS', 10, y);
    y += 10;

    const promises = this.sales.map((sale) =>
      this.transactionService
        .getTransactionDetailsByTransactionId(sale.id)
        .toPromise()
    );

    Promise.all(promises).then((allDetails) => {
      this.sales.forEach((sale, index) => {
        doc.text(
          `Venta #${sale.id} - Fecha: ${sale.date}`,
          10,
          y
        );
        y += 10;

        const details = allDetails[index];
        if (details && details.length > 0) {
          details.forEach((detail: TransactionDetails, i: number) => {
            const name =
              detail.stock?.id?.variationStk?.productVrt?.name || 'Desconocido';
            const unitPrice =
              detail.quantity > 0
                ? (detail.total / detail.quantity).toFixed(2)
                : '0.00';
            doc.text(
              `   ${i + 1}. Producto: ${name}, Cantidad: ${
                detail.quantity
              }, Precio Unitario: ${unitPrice}, Total: ${detail.total}`,
              10,
              y
            );
            y += 10;
            if (y > 270) {
              doc.addPage();
              y = 10;
            }
          });
        } else {
          doc.text('   Sin detalles disponibles', 10, y);
          y += 10;
        }

        y += 10;
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
      });

      doc.save('informe_ventas.pdf');
    });
  }
}
