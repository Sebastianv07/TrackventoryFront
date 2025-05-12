import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypesListComponent } from './transaction-types-list.component';

describe('TransactionTypesListComponent', () => {
  let component: TransactionTypesListComponent;
  let fixture: ComponentFixture<TransactionTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionTypesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
