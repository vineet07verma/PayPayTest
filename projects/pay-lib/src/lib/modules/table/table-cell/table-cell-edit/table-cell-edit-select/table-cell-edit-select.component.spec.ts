import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellEditSelectComponent } from './table-cell-edit-select.component';

describe('TableCellEditSelectComponent', () => {
  let component: TableCellEditSelectComponent;
  let fixture: ComponentFixture<TableCellEditSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCellEditSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellEditSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
