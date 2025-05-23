import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockService } from 'src/app/services/stock.service';
import { Stock, StockId } from 'src/app/models/stock';
import { ProductVariation } from 'src/app/models/productVariation';
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/services/store.service';
import { ProductVariationService } from 'src/app/services/product-variation.service';
import { AlertService } from 'src/app/services/alert.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-stock-create-edit',
  templateUrl: './stock-create-edit.component.html',
  styleUrls: ['./stock-create-edit.component.css'],
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
export class StockCreateEditComponent implements OnInit {
  stock: Stock = {
    id: {
      storeStk: { id: 0, code: '', address: '' },
      variationStk: {
        code: '',
        colorVrt: { id: 0, name: '', hexCode: '' },
        productVrt: {
          reference: '',
          name: '',
          price: 0,
          category: { id: 0, name: '', description: '' },
        },
      },
    },
    quantity: 0,
  };

  productVariations: ProductVariation[] = [];
  isEditMode = false;

  constructor(
    private stockService: StockService,
    public dialogRef: MatDialogRef<StockCreateEditComponent>,
    private productVariationService: ProductVariationService,
    private storeService: StoreService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.stock) {
      this.stock = { ...data.stock }; // Copia del stock para edición
      this.isEditMode = true;
    } else {
      this.storeService.getStoreById(data.storeId).subscribe({
        next: (store) => {
          this.stock.id.storeStk = store;
        },
        error: (err) => console.error('Error obteniendo la tienda', err),
      });
    }
  }

  ngOnInit(): void {
    this.loadProductVariations();
  }

  loadProductVariations(): void {
    this.productVariationService.getProductVariations().subscribe({
      next: (variations) => {
        this.productVariations = variations;
      },
      error: (err) =>
        console.error('Error cargando las variaciones de producto', err),
    });
  }

  onSave(): void {
    const storeId = this.stock.id.storeStk.id;
    const variationCode = this.stock.id.variationStk.code;

    if (this.isEditMode) {
      this.stockService
        .updateStock(storeId, variationCode, this.stock)
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
            this.alertService.showSuccess('Stock actualizado correctamente');
          },
          error: (err) => {
            console.error('Error actualizando el stock', err);
            this.alertService.showError('Error al actualizar el stock');
          },
        });
    } else {
      this.stockService.createStock(this.stock).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.alertService.showSuccess('Stock creado correctamente');
        },
        error: (err) => {
          console.error('Error creando el stock', err);
          this.alertService.showError('Error al crear el stock');
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
