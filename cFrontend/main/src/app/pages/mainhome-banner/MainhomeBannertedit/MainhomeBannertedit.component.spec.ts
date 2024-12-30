import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBannertwoComponent } from './MainhomeBannertedit.component';

describe('EditBannertwoComponent', () => {
  let component: EditBannertwoComponent;
  let fixture: ComponentFixture<EditBannertwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBannertwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBannertwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
