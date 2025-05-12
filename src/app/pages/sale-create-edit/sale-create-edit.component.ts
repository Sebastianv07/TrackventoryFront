import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transactions } from 'src/app/models/trasanctions';
import { TransactionDetails } from 'src/app/models/transactionDetails';
import { StockService } from 'src/app/services/stock.service';
import { Stock } from 'src/app/models/stock';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';
import { TransactionTypes } from 'src/app/models/transactionTypes';

@Component({
  selector: 'app-sale-create-edit',
  templateUrl: './sale-create-edit.component.html',
  styleUrls: ['./sale-create-edit.component.css']
})
export class SaleCreateEditComponent implements OnInit {

  transaction: Transactions = {
    id: 0,
    buyer: null, // Puedes cambiar esto si tienes un comprador registrado
    seller: null, // Se puede obtener del usuario logueado
    date: new Date(),
    transactionType: { id: 1, name: "Venta" } // Tipo de transacción 1 = Venta
  };

  transactionDetails: TransactionDetails[] = [];

  newTransactionDetail: TransactionDetails = {
    id: 0,
    transaction: this.transaction,
    stock: null,
    quantity: 0,
    total: 0
  };

  stocks: Stock[] = [];
  editMode = false;

  constructor(
    private transactionService: TransactionService,
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private login: LoginService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadStocks();
    if (id) {
      this.editMode = true;
      this.transactionService.getTransactionById(+id).subscribe((data: Transactions) => {
        this.transaction = data;
        this.loadTransactionDetails();
      });
    }
  }

  // Cargar los detalles de la transacción
  loadTransactionDetails(): void {
    this.transactionService.getTransactionDetailsByTransactionId(this.transaction.id).subscribe((data: TransactionDetails[]) => {
      this.transactionDetails = data;
    });
  }

  // Cargar los stocks disponibles
  loadStocks(): void {
    this.stockService.getAllStocks().subscribe((data: Stock[]) => {
      this.stocks = data.filter(stock => stock.quantity > 0);
    });
  }

  onSubmit(): void {
    if (this.transactionDetails.length === 0) {
      this.alertService.showError('Debe agregar al menos un detalle de transacción.');
      return;
    }

    const sellerId = 0; 
    const buyerId = 0; 

    this.transactionService.saveTransaction(this.transactionDetails, buyerId, sellerId, 1).subscribe({
      next: () => {
        this.alertService.showSuccess();
        this.router.navigate(['/sales']);
      },
      error: (err) => {
        this.alertService.showError();
        console.error('Error creando la transacción', err);
      }
    });
  }

  // Agregar un nuevo detalle de transacción
  addTransactionDetail(): void {
    if (this.newTransactionDetail.stock && this.newTransactionDetail.quantity > 0) {
      this.newTransactionDetail.total = this.newTransactionDetail.stock.id.variationStk.productVrt.price * this.newTransactionDetail.quantity;
      this.transactionDetails.push({ ...this.newTransactionDetail });
      this.transactionDetails = [...this.transactionDetails];

      // Resetear el formulario para agregar nuevos detalles
      this.newTransactionDetail = {
        id: 0,
        transaction: this.transaction,
        stock: null,
        quantity: 0,
        total: 0
      };
    } else {
      this.alertService.showError('Debe llenar todos los campos correctamente.');
    }
  }

  // Eliminar un detalle de transacción
  deleteTransactionDetail(transactionDetailId: number): void {
    this.transactionDetails = this.transactionDetails.filter(detail => detail.id !== transactionDetailId);
  }

  validateQuantity(): void {
    const maxQuantity = this.newTransactionDetail.stock?.quantity || Infinity;
    const minQuantity = 1;
  
    if (this.newTransactionDetail.quantity > maxQuantity) {
      this.newTransactionDetail.quantity = maxQuantity;
    } else if (this.newTransactionDetail.quantity < minQuantity) {
      this.newTransactionDetail.quantity = minQuantity;
    }
  }

  get totalTransactionValue(): number {
    return this.transactionDetails.reduce((total, detail) => total + (detail.total || 0), 0);
  }
}
