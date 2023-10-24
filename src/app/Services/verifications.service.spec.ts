import { TestBed } from '@angular/core/testing';

import { VerificationsService } from './verifications.service';

describe('VerificationsService', () => {
  let service: VerificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
