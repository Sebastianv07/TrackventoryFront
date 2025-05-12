import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCreateEditComponent } from './store-create-edit.component';

describe('StoreCreateEditComponent', () => {
  let component: StoreCreateEditComponent;
  let fixture: ComponentFixture<StoreCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
