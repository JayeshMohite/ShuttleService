import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpchatComponent } from './helpchat.component';

describe('HelpchatComponent', () => {
  let component: HelpchatComponent;
  let fixture: ComponentFixture<HelpchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpchatComponent]
    });
    fixture = TestBed.createComponent(HelpchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
