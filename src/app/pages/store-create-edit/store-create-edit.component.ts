import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';
import { Stock } from 'src/app/models/stock';
import { ProductVariationService } from 'src/app/services/product-variation.service';
import { ProductVariation } from 'src/app/models/productVariation';
import { MatDialog } from '@angular/material/dialog';
import { StockCreateEditComponent } from '../stock-create-edit/stock-create-edit.component';
import { AlertService } from 'src/app/services/alert.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { storeStock } from 'src/app/models/storeStock';

@Component({
  selector: 'app-store-create-edit',
  templateUrl: './store-create-edit.component.html',
  styleUrls: ['./store-create-edit.component.css'],
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
export class StoreCreateEditComponent implements OnInit {
  store: Store = {
    id: 0,
    code: '',
    address: '',
  };

  storeStock: storeStock[] = [];
  stock: Stock[] = [];
  productVariations: ProductVariation[] = [];
  editMode = false;

  constructor(
    private storeService: StoreService,
    private stockService: StockService,
    private productVariationService: ProductVariationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadProductVariations();
    if (id) {
      this.editMode = true;
      this.storeService.getStoreById(+id).subscribe((data: Store) => {
        this.store = data;
        this.loadStoreStocks();
        this.loadStocks();
      });
    }
  }

  onSubmit(): void {
    if (this.editMode) {
      this.storeService.updateStore(this.store.id, this.store).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/stores']);
        },
        error: (err) => {
          this.alertService.showError();
          console.error('Error actualizando la tienda', err);
        },
      });
    } else {
      this.storeService.createStore(this.store).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/stores']);
        },
        error: (err) => {
          this.alertService.showError();
          console.error('Error creando la tienda', err);
        },
      });
    }
  }

  getRelatedStock(storeItem: storeStock): Stock | undefined {
    return this.stock.find(
      (s) =>
        String(s.id.storeStk.id) === String(storeItem.id) &&
        String(s.id.variationStk.code) === String(storeItem.codeVariation)
    );
  }

  // Cargar los stocks relacionados con la tienda
  loadStoreStocks(): void {
    this.storeService
      .getStoresStock(this.store.id)
      .subscribe((data: storeStock[]) => {
        this.storeStock = data;
      });
  }

  loadStocks(): void {
    this.stockService
      .getStockByStoreId(this.store.id)
      .subscribe((data: Stock[]) => {
        this.stock = data;
      });
  }

  // Cargar las variaciones de productos para asignarlas al stock
  loadProductVariations(): void {
    this.productVariationService
      .getProductVariations()
      .subscribe((data: ProductVariation[]) => {
        this.productVariations = data;
      });
  }

  openAddStockDialog(): void {
    const dialogRef = this.dialog.open(StockCreateEditComponent, {
      width: '400px',
      data: { storeId: this.store.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadStoreStocks(); // Recargar las variaciones después de agregar una
      }
    });
  }

  // Abrir diálogo para editar una variación existente
  openEditStockDialog(stock: Stock): void {
    const dialogRef = this.dialog.open(StockCreateEditComponent, {
      width: '400px',
      data: { stock: stock, storeId: this.store.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadStoreStocks(); // Recargar las variaciones después de editar
      }
    });
  }

  deleteStock(stock: Stock): void {
    this.stockService
      .deleteStock(stock.id.storeStk.id, stock.id.variationStk.code)
      .subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.loadStocks();
        },
        error: (err) => {
          console.error('Error eliminando el stock', err);
          this.alertService.showError();
          this.loadStocks();
        },
      });
  }
}
