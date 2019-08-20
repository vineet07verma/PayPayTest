import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellDefaultComponent } from './table-cell-default.component';

describe('TableCellDefaultComponent', () => {
  let component: TableCellDefaultComponent;
  let fixture: ComponentFixture<TableCellDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCellDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
