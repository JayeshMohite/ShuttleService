import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbusComponent } from './newbus.component';

describe('NewbusComponent', () => {
  let component: NewbusComponent;
  let fixture: ComponentFixture<NewbusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewbusComponent]
    });
    fixture = TestBed.createComponent(NewbusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
