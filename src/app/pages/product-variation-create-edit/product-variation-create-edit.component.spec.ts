import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariationCreateEditComponent } from './product-variation-create-edit.component';

describe('ProductVariationCreateEditComponent', () => {
  let component: ProductVariationCreateEditComponent;
  let fixture: ComponentFixture<ProductVariationCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductVariationCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductVariationCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
