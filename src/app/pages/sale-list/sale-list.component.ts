import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transactions } from 'src/app/models/trasanctions';
import { TransactionDetails } from 'src/app/models/transactionDetails';
import { trigger, transition, style, animate } from '@angular/animations';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';

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

  async downloadPDF(): Promise<void> {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text('Reporte de Ventas', 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generado el: ${new Date().toLocaleDateString('es-ES')}`, 14, 30);

    let yPosition = 40;

    if (this.sales.length === 0) {
      doc.text('No hay ventas registradas', 14, yPosition);
      doc.save(`ventas_${new Date().toISOString().split('T')[0]}.pdf`);
      return;
    }
    for (let i = 0; i < this.sales.length; i++) {
      const sale = this.sales[i];

      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text(`Venta ID: ${sale.id}`, 14, yPosition);
      doc.text(
        `Fecha: ${new Date(sale.date).toLocaleDateString('es-ES')}`,
        14,
        yPosition + 8
      );

      yPosition += 20;

      try {
        const details = await this.getSaleDetailsForPDF(sale.id);

        if (details && details.length > 0) {
          const tableData = details.map((detail) => [
            detail.stock?.id?.variationStk?.productVrt?.name || 'N/A',
            detail.quantity.toString(),
            `$${detail.total.toLocaleString('es-ES', {
              minimumFractionDigits: 2,
            })}`,
          ]);

          autoTable(doc, {
            startY: yPosition,
            head: [['Producto', 'Cantidad', 'Valor Total']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [52, 152, 219] },
            margin: { left: 14, right: 14 },
            styles: { fontSize: 10 },
          });

          yPosition = (doc as any).lastAutoTable.finalY + 10;
          const saleTotal = details.reduce(
            (sum, detail) => sum + detail.total,
            0
          );
          doc.setFontSize(12);
          doc.setTextColor(40);
          doc.text(
            `Total: $${saleTotal.toLocaleString('es-ES', {
              minimumFractionDigits: 2,
            })}`,
            14,
            yPosition
          );

          yPosition += 20;
        } else {
          doc.setFontSize(10);
          doc.setTextColor(100);
          doc.text('Sin detalles disponibles', 14, yPosition);
          yPosition += 15;
        }
      } catch (error) {
        console.error(
          `Error obteniendo detalles para venta ${sale.id}:`,
          error
        );
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Error al cargar detalles', 14, yPosition);
        yPosition += 15;
      }

      if (i < this.sales.length - 1) {
        doc.setDrawColor(200);
        doc.line(14, yPosition, 196, yPosition);
        yPosition += 10;
      }
    }

    doc.save(`ventas_${new Date().toISOString().split('T')[0]}.pdf`);
  }

  downloadSalePDF(sale: any): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text('Detalle de Venta', 14, 22);

    doc.setFontSize(12);
    doc.text(`ID de Venta: ${sale.id}`, 14, 35);
    doc.text(
      `Fecha: ${new Date(sale.date).toLocaleDateString('es-ES')}`,
      14,
      45
    );
    doc.text(
      `Hora: ${new Date(sale.date).toLocaleTimeString('es-ES')}`,
      14,
      55
    );

    this.getSaleDetailsForPDF(sale.id).then((details) => {
      if (details && details.length > 0) {
        const tableData = details.map((detail) => [
          detail.stock?.id?.variationStk?.productVrt?.name || 'N/A',
          detail.quantity.toString(),
          `$${detail.total.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
          })}`,
        ]);

        autoTable(doc, {
          startY: 70,
          head: [['Producto', 'Cantidad', 'Valor Total']],
          body: tableData,
          theme: 'striped',
          headStyles: { fillColor: [52, 152, 219] },
          margin: { left: 14, right: 14 },
        });

        const total = details.reduce((sum, detail) => sum + detail.total, 0);
        const finalY = (doc as any).lastAutoTable.finalY + 15;

        doc.setFontSize(14);
        doc.setTextColor(40);
        doc.text(
          `Total de la Venta: $${total.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
          })}`,
          14,
          finalY
        );

        doc.save(
          `venta_${sale.id}_${new Date().toISOString().split('T')[0]}.pdf`
        );
      } else {
        doc.text('No se encontraron detalles para esta venta', 14, 70);
        doc.save(
          `venta_${sale.id}_${new Date().toISOString().split('T')[0]}.pdf`
        );
      }
    });
  }
  private async getSaleDetailsForPDF(saleId: number): Promise<any[]> {
    try {
      if (
        this.selectedSaleId === saleId &&
        this.saleDetails &&
        this.saleDetails.length > 0
      ) {
        return this.saleDetails;
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([]);
        }, 100);
      });
    } catch (error) {
      console.error('Error obteniendo detalles de venta:', error);
      return [];
    }
  }
}
