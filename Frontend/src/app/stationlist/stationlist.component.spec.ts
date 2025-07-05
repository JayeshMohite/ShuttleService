import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationlistComponent } from './stationlist.component';

describe('StationlistComponent', () => {
  let component: StationlistComponent;
  let fixture: ComponentFixture<StationlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StationlistComponent]
    });
    fixture = TestBed.createComponent(StationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
