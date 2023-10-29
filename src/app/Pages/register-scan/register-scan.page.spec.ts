import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterScanPage } from './register-scan.page';

describe('RegisterScanPage', () => {
  let component: RegisterScanPage;
  let fixture: ComponentFixture<RegisterScanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
