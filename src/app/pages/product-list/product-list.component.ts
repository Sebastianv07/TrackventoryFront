import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/productCategory';
import { CategoryService } from 'src/app/services/category.service';
import { AlertService } from 'src/app/services/alert.service'; // Asegúrate de importar tu servicio correctamente


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  categories: ProductCategory[] = [];

  // Objeto para almacenar los filtros
  filters = {
    reference: '',
    name: '',
    price: undefined,
    categoryId: undefined
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    // Cargar todos los productos inicialmente
    this.loadProducts();

    // Cargar todas las categorías para el filtro
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  // Método para cargar productos con o sin filtros
  loadProducts(): void {
    const { reference, name, price, categoryId } = this.filters;
    this.productService.getFilteredProducts(reference, name, price, categoryId).subscribe(products => {
      this.products = products;
    });
  }

  // Aplicar los filtros
  applyFilters(): void {
    this.loadProducts(); // Recargar la lista de productos con los filtros aplicados
  }

  // Limpiar los filtros
  clearFilters(): void {
    this.filters = {
      reference: '',
      name: '',
      price: undefined,
      categoryId: undefined
    };
    this.loadProducts(); // Recargar la lista de productos sin filtros
  }

  deleteProduct(reference: string): void {
    this.productService.deleteProduct(reference).subscribe(
      () => {
        this.products = this.products.filter(product => product.reference !== reference);
        this.alertService.showSuccess();
      },
      (error) => {
        this.alertService.showError();
        console.error('Error al eliminar el producto', error);
      }
    );
  }
}
