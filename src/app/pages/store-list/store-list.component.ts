import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store';
import { AlertService } from 'src/app/services/alert.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  stores: Store[] = [];

  constructor(private storeService: StoreService,
    private alertService: AlertService,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.getStores().subscribe(
      (data: Store[]) => {
        this.stores = data;
      },
      (error) => {
        console.error('Error al cargar las tiendas', error);
      }
    );
  }

  deleteStore(id: number): void {
    this.storeService.deleteStore(id).subscribe(
      () => {
        this.stores = this.stores.filter(store => store.id !== id);
        this.alertService.showSuccess();
      },
      (error) => {
        console.error('Error al eliminar la tienda', error);
        this.alertService.showError();
      }
    );
  }

  downloadReport(): void {
    this.stockService.downloadExcelReport().subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporteStock.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al descargar el reporte:', error);
        this.alertService.showError();
      }
    );
  }

}
