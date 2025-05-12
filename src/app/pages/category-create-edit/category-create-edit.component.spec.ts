import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCreateEditComponent } from './category-create-edit.component';

describe('CategoryCreateEditComponent', () => {
  let component: CategoryCreateEditComponent;
  let fixture: ComponentFixture<CategoryCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
