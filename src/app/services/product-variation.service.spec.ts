import { TestBed } from '@angular/core/testing';

import { ProductVariationService } from './product-variation.service';

describe('ProductVariationService', () => {
  let service: ProductVariationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductVariationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
