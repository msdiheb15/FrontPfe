import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccederAuTimesheetComponent } from './acceder-au-timesheet.component';

describe('AccederAuTimesheetComponent', () => {
  let component: AccederAuTimesheetComponent;
  let fixture: ComponentFixture<AccederAuTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccederAuTimesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccederAuTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
