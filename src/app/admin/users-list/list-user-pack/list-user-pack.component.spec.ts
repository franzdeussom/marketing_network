import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserPackComponent } from './list-user-pack.component';

describe('ListUserPackComponent', () => {
  let component: ListUserPackComponent;
  let fixture: ComponentFixture<ListUserPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserPackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
