import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackhelpticketComponent } from './trackhelpticket.component';

describe('TrackhelpticketComponent', () => {
  let component: TrackhelpticketComponent;
  let fixture: ComponentFixture<TrackhelpticketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackhelpticketComponent]
    });
    fixture = TestBed.createComponent(TrackhelpticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
