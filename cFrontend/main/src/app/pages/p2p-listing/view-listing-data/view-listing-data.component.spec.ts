import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListingDataComponent } from './view-listing-data.component';

describe('ViewListingDataComponent', () => {
  let component: ViewListingDataComponent;
  let fixture: ComponentFixture<ViewListingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewListingDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
