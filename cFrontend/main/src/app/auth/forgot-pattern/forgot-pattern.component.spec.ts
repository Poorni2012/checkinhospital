import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPatternComponent } from './forgot-pattern.component';

describe('ForgotPatternComponent', () => {
  let component: ForgotPatternComponent;
  let fixture: ComponentFixture<ForgotPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
