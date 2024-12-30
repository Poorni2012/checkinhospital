import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainhomeBanneraddComponent } from './MainhomeBanneradd.component';

describe('MainhomeBanneraddComponent', () => {
  let component: MainhomeBanneraddComponent;
  let fixture: ComponentFixture<MainhomeBanneraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainhomeBanneraddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainhomeBanneraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
