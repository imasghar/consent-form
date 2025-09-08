import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebridementConsent } from './debridement-consent';

describe('DebridementConsent', () => {
  let component: DebridementConsent;
  let fixture: ComponentFixture<DebridementConsent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebridementConsent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebridementConsent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
