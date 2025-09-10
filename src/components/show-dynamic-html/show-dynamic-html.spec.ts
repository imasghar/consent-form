import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDynamicHtml } from './show-dynamic-html';

describe('ShowDynamicHtml', () => {
  let component: ShowDynamicHtml;
  let fixture: ComponentFixture<ShowDynamicHtml>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDynamicHtml]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDynamicHtml);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
