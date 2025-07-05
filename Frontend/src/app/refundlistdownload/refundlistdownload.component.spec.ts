import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundlistdownloadComponent } from './refundlistdownload.component';

describe('RefundlistdownloadComponent', () => {
  let component: RefundlistdownloadComponent;
  let fixture: ComponentFixture<RefundlistdownloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefundlistdownloadComponent]
    });
    fixture = TestBed.createComponent(RefundlistdownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
