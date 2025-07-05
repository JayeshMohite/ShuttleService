import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminhelpchatComponent } from './adminhelpchat.component';

describe('AdminhelpchatComponent', () => {
  let component: AdminhelpchatComponent;
  let fixture: ComponentFixture<AdminhelpchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminhelpchatComponent]
    });
    fixture = TestBed.createComponent(AdminhelpchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
