import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactusComponent } from './list-contactus.component';

describe('ListContactusComponent', () => {
  let component: ListContactusComponent;
  let fixture: ComponentFixture<ListContactusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContactusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
