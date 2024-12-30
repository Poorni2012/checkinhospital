import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTransferHistoryComponent } from './list-transfer-history.component';

describe('ListTransferHistoryComponent', () => {
  let component: ListTransferHistoryComponent;
  let fixture: ComponentFixture<ListTransferHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTransferHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTransferHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
