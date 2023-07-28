import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGenerationsComponent } from './user-generations.component';

describe('UserGenerationsComponent', () => {
  let component: UserGenerationsComponent;
  let fixture: ComponentFixture<UserGenerationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGenerationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGenerationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
