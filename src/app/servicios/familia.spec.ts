import { TestBed } from '@angular/core/testing';

import { ServFamilia } from './familia';

describe('ServFamilia', () => {
  let service: ServFamilia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServFamilia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
