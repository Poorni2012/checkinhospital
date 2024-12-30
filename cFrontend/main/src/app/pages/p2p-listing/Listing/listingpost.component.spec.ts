import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPostComponent } from './listingpost.component';

describe('ListingPostComponent', () => {
  let component: ListingPostComponent;
  let fixture: ComponentFixture<ListingPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
