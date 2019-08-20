import { Component, EventEmitter, Input, Output, ViewEncapsulation, SimpleChanges, OnChanges} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { ITableHeaderItem } from '../../../../core/interfaces/index'
import { FIELD_EVENT_TYPE, TableFieldEvent } from '../../../../core/models/index';

@Component({
    selector: 'cui-table-cell-edit',
    template: ''
})
export class TableCellEditComponent {
    @Input() editData: string | any = null;
    @Input() editError: string;
    @Input() editPlaceholder: string = '';
    @Input() editOptions: any;

    @Output() onFieldEvent: EventEmitter<TableFieldEvent> = new EventEmitter<TableFieldEvent>();
    
    constructor() { }

    onBlur(value: any, element: Element) {
        this.onFieldEvent.emit(this._getEditEvent(FIELD_EVENT_TYPE.BLUR, element, value));
    }

    onFocus(value: any, element: Element) {
        this.onFieldEvent.emit(this._getEditEvent(FIELD_EVENT_TYPE.FOCUS, element, value));
    }

    onChange(value: any, element: any) {
        this.onFieldEvent.emit(this._getEditEvent(FIELD_EVENT_TYPE.CHANGE, element, value));
    }
    private _getEditEvent(eventType: FIELD_EVENT_TYPE, element: Element, value: any): TableFieldEvent {
        let editEvent = new TableFieldEvent({
            element: element,
            eventType: eventType,
            value: value
        });
        return editEvent;
    }
}
