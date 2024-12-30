import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupportticketComponent } from './list-supportticket.component';

describe('ListSupportticketComponent', () => {
  let component: ListSupportticketComponent;
  let fixture: ComponentFixture<ListSupportticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSupportticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSupportticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
