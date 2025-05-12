import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductVariationService } from 'src/app/services/product-variation.service';

import { ProductVariation } from 'src/app/models/productVariation';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/colors.service';
import { ProductService } from 'src/app/services/product.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-product-variation-create-edit',
  templateUrl: './product-variation-create-edit.component.html',
  styleUrls: ['./product-variation-create-edit.component.css']
})
export class ProductVariationCreateEditComponent implements OnInit {

  productVariation: ProductVariation = {
    code: '',
    colorVrt: {
      id: 0,
      name: '',
      hexCode: ''
    },
    productVrt: {
      reference: '',
      name: '',
      price: 0,
      category: {
        id: 0, 
        // code: '',
        name: '',
        description: ''
      }
    }
  };

  colors: Color[] = [];
  isEditMode = false;

  constructor(
    private productVariationService: ProductVariationService,
    private productService: ProductService,
    private colorService: ColorService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ProductVariationCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Establece la referencia del producto en la variación
    if (data.productVariation) {
      this.productVariation = data.productVariation;
      this.isEditMode = true;
    } else {
      this.productService.getProductByReference(data.productReference).subscribe({
        next: (product) => {
          this.productVariation.productVrt = product;
        },
        error: (err) => {console.error('Error obteniendo el producto', err);
          this.alertService.showError();
        }
      });
    }
  }

  ngOnInit(): void {
    this.loadColors();
  }

  loadColors(): void {
    this.colorService.getColors().subscribe((colors: Color[]) => {
      this.colors = colors;
    });
  }

  onSave(): void {
    if (this.isEditMode) {
      this.productVariationService.updateProductVariation(this.productVariation.code, this.productVariation)
        .subscribe({
          next: () => {this.dialogRef.close(true);
            this.alertService.showSuccess();
          },
          error: (err) => {console.error('Error actualizando la variación', err);
            this.alertService.showError();}
        });
    } else {
      this.productVariationService.createProductVariation(this.productVariation)
        .subscribe({
          next: () => {this.dialogRef.close(true);
            this.alertService.showSuccess();
          },
          error: (err) => {console.error('Error creando la variación', err);
            this.alertService.showError();}
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  compareColors(color1: any, color2: any): boolean {
    return color1 && color2 ? color1.hexCode === color2.hexCode : color1 === color2;
  }  
}
