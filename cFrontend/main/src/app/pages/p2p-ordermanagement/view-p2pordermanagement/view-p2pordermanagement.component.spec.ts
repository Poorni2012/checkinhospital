import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewP2pordermanagementComponent } from './view-p2pordermanagement.component';

describe('ViewP2pordermanagementComponent', () => {
  let component: ViewP2pordermanagementComponent;
  let fixture: ComponentFixture<ViewP2pordermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewP2pordermanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewP2pordermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
