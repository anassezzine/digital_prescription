import { TestBed } from '@angular/core/testing';

import { UseService } from './use.service';

describe('UseService', () => {
  let service: UseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
