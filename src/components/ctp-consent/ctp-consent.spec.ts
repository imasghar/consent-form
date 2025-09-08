import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTPConsent } from './ctp-consent';

describe('CTPConsent', () => {
  let component: CTPConsent;
  let fixture: ComponentFixture<CTPConsent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CTPConsent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTPConsent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
