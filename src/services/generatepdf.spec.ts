import { TestBed } from '@angular/core/testing';

import { Generatepdf } from './generatepdf';

describe('Generatepdf', () => {
  let service: Generatepdf;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Generatepdf);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
