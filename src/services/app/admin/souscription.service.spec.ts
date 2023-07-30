import { TestBed } from '@angular/core/testing';

import { SouscriptionService } from './souscription.service';

describe('SouscriptionService', () => {
  let service: SouscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SouscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
