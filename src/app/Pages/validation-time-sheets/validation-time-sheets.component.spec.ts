import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationTimeSheetsComponent } from './validation-time-sheets.component';

describe('ValidationTimeSheetsComponent', () => {
  let component: ValidationTimeSheetsComponent;
  let fixture: ComponentFixture<ValidationTimeSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationTimeSheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationTimeSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
