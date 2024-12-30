import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsermanagementComponent } from './list-usermanagement.component';

describe('ListUsermanagementComponent', () => {
  let component: ListUsermanagementComponent;
  let fixture: ComponentFixture<ListUsermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsermanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
