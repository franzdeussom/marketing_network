import { TestBed } from '@angular/core/testing';

import { PageSecurityService } from './page-security.service';

describe('PageSecurityService', () => {
  let service: PageSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
