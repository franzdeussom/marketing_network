import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouscriptionRequestComponent } from './souscription-request.component';

describe('SouscriptionRequestComponent', () => {
  let component: SouscriptionRequestComponent;
  let fixture: ComponentFixture<SouscriptionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouscriptionRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SouscriptionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
