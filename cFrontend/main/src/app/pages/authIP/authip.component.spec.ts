import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthipComponent } from './authip.component';

describe('AuthipComponent', () => {
  let component: AuthipComponent;
  let fixture: ComponentFixture<AuthipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
