import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpWhitelistComponent } from './ip-whitelist.component';

describe('IpWhitelistComponent', () => {
  let component: IpWhitelistComponent;
  let fixture: ComponentFixture<IpWhitelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpWhitelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpWhitelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
