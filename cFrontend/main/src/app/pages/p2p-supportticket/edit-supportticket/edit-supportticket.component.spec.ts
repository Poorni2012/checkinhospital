import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSupportticketComponent } from './edit-supportticket.component';

describe('EditSupportticketComponent', () => {
  let component: EditSupportticketComponent;
  let fixture: ComponentFixture<EditSupportticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSupportticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSupportticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
