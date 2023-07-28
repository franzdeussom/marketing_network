import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilsComponent } from './user-profils.component';

describe('UserProfilsComponent', () => {
  let component: UserProfilsComponent;
  let fixture: ComponentFixture<UserProfilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
