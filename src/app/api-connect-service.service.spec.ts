import { TestBed } from '@angular/core/testing';

import { ApiConnectServiceService } from './api-connect-service.service';

describe('ApiConnectServiceService', () => {
  let service: ApiConnectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConnectServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
