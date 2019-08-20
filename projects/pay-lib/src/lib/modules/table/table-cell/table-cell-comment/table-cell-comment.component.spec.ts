import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellCommentComponent } from './table-cell-comment.component';

describe('TableCellCommentComponent', () => {
  let component: TableCellCommentComponent;
  let fixture: ComponentFixture<TableCellCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCellCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
