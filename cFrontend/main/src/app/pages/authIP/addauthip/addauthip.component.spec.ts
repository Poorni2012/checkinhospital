import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddauthIpComponent } from './addauthip.component';

describe('AddauthIpComponent', () => {
  let component: AddauthIpComponent;
  let fixture: ComponentFixture<AddauthIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddauthIpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddauthIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
