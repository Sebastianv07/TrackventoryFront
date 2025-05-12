import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorCreateEditComponent } from './color-create-edit.component';

describe('ColorCreateEditComponent', () => {
  let component: ColorCreateEditComponent;
  let fixture: ComponentFixture<ColorCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
