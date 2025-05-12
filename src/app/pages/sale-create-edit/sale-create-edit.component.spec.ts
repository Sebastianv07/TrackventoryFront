import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCreateEditComponent } from './sale-create-edit.component';

describe('SaleCreateEditComponent', () => {
  let component: SaleCreateEditComponent;
  let fixture: ComponentFixture<SaleCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
