import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationtrackerComponent } from './locationtracker.component';

describe('LocationtrackerComponent', () => {
  let component: LocationtrackerComponent;
  let fixture: ComponentFixture<LocationtrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationtrackerComponent]
    });
    fixture = TestBed.createComponent(LocationtrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
