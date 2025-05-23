import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductCategory } from 'src/app/models/productCategory';
import { AlertService } from 'src/app/services/alert.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-category-create-edit',
  templateUrl: './category-create-edit.component.html',
  styleUrls: ['./category-create-edit.component.css'],
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
export class CategoryCreateEditComponent implements OnInit {
  category: ProductCategory = {
    id: 0,
    name: '',
    description: '',
  };

  editMode = false;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.categoryService
        .getCategoryById(+id)
        .subscribe((data: ProductCategory) => {
          this.category = data;
        });
    }
  }

  onSubmit(): void {
    if (this.editMode) {
      this.categoryService
        .updateCategory(this.category.id, this.category)
        .subscribe({
          next: () => {
            this.alertService.showSuccess();
            this.router.navigate(['/categories']);
          },
          error: (err) => {
            this.alertService.showError();
            console.error('Error actualizando la categoría', err);
          },
        });
    } else {
      this.categoryService.createCategory(this.category).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/categories']);
        },
        error: (err) => {
          this.alertService.showError();
          console.error('Error creando la categoría', err);
        },
      });
    }
  }
}
