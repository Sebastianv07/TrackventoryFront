import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductCategory } from 'src/app/models/productCategory';
import { MatDialog } from '@angular/material/dialog';
import { ProductVariationService } from 'src/app/services/product-variation.service';
import { ProductVariation } from 'src/app/models/productVariation';
import { ProductVariationCreateEditComponent } from '../product-variation-create-edit/product-variation-create-edit.component';
import { AlertService } from 'src/app/services/alert.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-product-create-edit',
  templateUrl: './product-create-edit.component.html',
  styleUrls: ['./product-create-edit.component.css'],
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
export class ProductCreateEditComponent implements OnInit {
  product: Product = {
    reference: '',
    name: '',
    price: 0,
    category: {
      id: 0,
      // code: '',
      name: '',
      description: '',
    },
  };

  productVariations: ProductVariation[] = [];
  categories: ProductCategory[] = [];
  editMode = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private productVariationService: ProductVariationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const reference = this.route.snapshot.paramMap.get('reference');
    this.loadCategories();

    if (reference) {
      this.editMode = true;
      this.productService
        .getProductByReference(reference)
        .subscribe((data: Product) => {
          this.product = data;
          this.loadProductVariations();
        });
    }
  }

  loadCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories: ProductCategory[]) => {
        this.categories = categories;
      });
  }

  onSubmit(): void {
    if (this.editMode) {
      this.productService
        .updateProduct(this.product.reference, this.product)
        .subscribe({
          next: () => {
            this.alertService.showSuccess();
            this.router.navigate(['/products']);
          },
          error: (err) => {
            console.error('Error actualizando el producto', err);
            this.alertService.showError();
          },
        });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error creando el producto', err);
          this.alertService.showError();
        },
      });
    }
  }

  // Cargar variaciones de producto
  loadProductVariations(): void {
    this.productVariationService
      .getProductVariationsByProductReference(this.product.reference)
      .subscribe((variations) => (this.productVariations = variations));
  }

  // Abrir diálogo para agregar una nueva variación
  openAddVariationDialog(): void {
    const dialogRef = this.dialog.open(ProductVariationCreateEditComponent, {
      width: '400px',
      data: { productReference: this.product.reference },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProductVariations(); // Recargar las variaciones después de agregar una
      }
    });
  }

  // Abrir diálogo para editar una variación existente
  openEditVariationDialog(variation: ProductVariation): void {
    const dialogRef = this.dialog.open(ProductVariationCreateEditComponent, {
      width: '400px',
      data: {
        productVariation: variation,
        productReference: this.product.reference,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadProductVariations(); // Recargar las variaciones después de editar
    });
  }

  // Eliminar una variación
  deleteVariation(code: string): void {
    this.productVariationService.deleteProductVariation(code).subscribe({
      next: () => {
        this.alertService.showSuccess();
        this.loadProductVariations();
      },
      error: (err) => {
        console.error('Error eliminando la variacion', err);
        this.alertService.showError();
        this.loadProductVariations();
      },
    });
  }

  compareCategories(category1: any, category2: any): boolean {
    return category1 && category2
      ? category1.id === category2.id
      : category1 === category2;
  }
}
