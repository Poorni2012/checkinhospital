import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackhistoryComponent } from './feedbackhistory.component';

describe('FeedbackhistoryComponent', () => {
  let component: FeedbackhistoryComponent;
  let fixture: ComponentFixture<FeedbackhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackhistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
