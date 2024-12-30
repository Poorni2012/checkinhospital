import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKycdetailsComponent } from './edit-kycdetails.component';

describe('EditKycdetailsComponent', () => {
  let component: EditKycdetailsComponent;
  let fixture: ComponentFixture<EditKycdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditKycdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKycdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
