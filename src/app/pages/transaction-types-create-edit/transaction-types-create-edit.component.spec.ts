import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypesCreateEditComponent } from './transaction-types-create-edit.component';

describe('TransactionTypesCreateEditComponent', () => {
  let component: TransactionTypesCreateEditComponent;
  let fixture: ComponentFixture<TransactionTypesCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionTypesCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionTypesCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
