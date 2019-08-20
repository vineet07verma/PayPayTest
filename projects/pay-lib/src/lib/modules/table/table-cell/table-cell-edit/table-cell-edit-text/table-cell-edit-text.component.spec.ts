import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellEditTextComponent } from './table-cell-edit-text.component';

describe('TableCellEditTextComponent', () => {
  let component: TableCellEditTextComponent;
  let fixture: ComponentFixture<TableCellEditTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCellEditTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellEditTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
