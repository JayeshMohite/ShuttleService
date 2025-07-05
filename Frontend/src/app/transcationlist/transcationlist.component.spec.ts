import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscationlistComponent } from './transcationlist.component';

describe('TranscationlistComponent', () => {
  let component: TranscationlistComponent;
  let fixture: ComponentFixture<TranscationlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranscationlistComponent]
    });
    fixture = TestBed.createComponent(TranscationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
