import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCreateEditComponent } from './profile-create-edit.component';

describe('ProfileCreateEditComponent', () => {
  let component: ProfileCreateEditComponent;
  let fixture: ComponentFixture<ProfileCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
