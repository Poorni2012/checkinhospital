import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannertwoComponent } from './mainhome-banner.component';

describe('HomeBannertwoComponent', () => {
  let component: HomeBannertwoComponent;
  let fixture: ComponentFixture<HomeBannertwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBannertwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBannertwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
