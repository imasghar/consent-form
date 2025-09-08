import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiopsyConsent } from './biopsy-consent';

describe('BiopsyConsent', () => {
  let component: BiopsyConsent;
  let fixture: ComponentFixture<BiopsyConsent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiopsyConsent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiopsyConsent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
