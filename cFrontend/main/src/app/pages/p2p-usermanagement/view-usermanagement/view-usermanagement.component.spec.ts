import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsermanagementComponent } from './view-usermanagement.component';

describe('ViewUsermanagementComponent', () => {
  let component: ViewUsermanagementComponent;
  let fixture: ComponentFixture<ViewUsermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUsermanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
