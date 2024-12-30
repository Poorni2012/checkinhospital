import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWithdrawDataComponent } from './view-withdraw-data.component';

describe('ViewWithdrawDataComponent', () => {
  let component: ViewWithdrawDataComponent;
  let fixture: ComponentFixture<ViewWithdrawDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWithdrawDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWithdrawDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
