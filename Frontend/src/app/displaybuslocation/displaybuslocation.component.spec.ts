import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaybuslocationComponent } from './displaybuslocation.component';

describe('DisplaybuslocationComponent', () => {
  let component: DisplaybuslocationComponent;
  let fixture: ComponentFixture<DisplaybuslocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplaybuslocationComponent]
    });
    fixture = TestBed.createComponent(DisplaybuslocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
