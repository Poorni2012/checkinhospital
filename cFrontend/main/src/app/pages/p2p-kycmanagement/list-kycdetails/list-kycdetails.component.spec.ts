import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKycdetailsComponent } from './list-kycdetails.component';

describe('ListKycdetailsComponent', () => {
  let component: ListKycdetailsComponent;
  let fixture: ComponentFixture<ListKycdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListKycdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKycdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
