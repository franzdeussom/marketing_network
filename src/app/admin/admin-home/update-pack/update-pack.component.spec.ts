import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePackComponent } from './update-pack.component';

describe('UpdatePackComponent', () => {
  let component: UpdatePackComponent;
  let fixture: ComponentFixture<UpdatePackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
