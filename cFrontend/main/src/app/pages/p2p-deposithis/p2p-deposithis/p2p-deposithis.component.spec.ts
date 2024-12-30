import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pDeposithisComponent } from './p2p-deposithis.component';

describe('P2pDeposithisComponent', () => {
  let component: P2pDeposithisComponent;
  let fixture: ComponentFixture<P2pDeposithisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P2pDeposithisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pDeposithisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
