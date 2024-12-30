import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListP2pordermanagementComponent } from './list-p2pordermanagement.component';

describe('ListP2pordermanagementComponent', () => {
  let component: ListP2pordermanagementComponent;
  let fixture: ComponentFixture<ListP2pordermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListP2pordermanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListP2pordermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
