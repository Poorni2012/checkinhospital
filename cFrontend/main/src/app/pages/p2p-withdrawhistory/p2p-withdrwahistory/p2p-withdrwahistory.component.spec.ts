import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pWithdrwahistoryComponent } from './p2p-withdrwahistory.component';

describe('P2pWithdrwahistoryComponent', () => {
  let component: P2pWithdrwahistoryComponent;
  let fixture: ComponentFixture<P2pWithdrwahistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P2pWithdrwahistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pWithdrwahistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
