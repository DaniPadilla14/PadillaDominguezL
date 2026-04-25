import { TestBed } from '@angular/core/testing';

import { Acerade } from './acerade';

describe('Acerade', () => {
  let service: Acerade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Acerade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
