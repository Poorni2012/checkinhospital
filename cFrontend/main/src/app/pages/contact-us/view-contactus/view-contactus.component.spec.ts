import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactusComponent } from './view-contactus.component';

describe('ViewContactusComponent', () => {
  let component: ViewContactusComponent;
  let fixture: ComponentFixture<ViewContactusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewContactusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
