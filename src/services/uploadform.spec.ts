import { TestBed } from '@angular/core/testing';

import { Uploadform } from './uploadform';

describe('Uploadform', () => {
  let service: Uploadform;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Uploadform);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
