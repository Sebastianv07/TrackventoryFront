import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCreateEditComponent } from './stock-create-edit.component';

describe('StockCreateEditComponent', () => {
  let component: StockCreateEditComponent;
  let fixture: ComponentFixture<StockCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
