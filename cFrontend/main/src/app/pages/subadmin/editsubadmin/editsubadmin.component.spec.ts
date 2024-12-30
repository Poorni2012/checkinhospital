import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsubadminComponent } from './editsubadmin.component';

describe('EditsubadminComponent', () => {
  let component: EditsubadminComponent;
  let fixture: ComponentFixture<EditsubadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsubadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsubadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
