import { ITableRowData } from '../interfaces/table-row-data.interface';

export class TableFieldEvent {
    element: Element;
    row: ITableRowData;
    field: string;
    eventType: FIELD_EVENT_TYPE;
    value: any;
    event: Event;

    constructor(obj: {
                    element?: Element,
                    row?: ITableRowData,
                    field?: string,
                    eventType?: FIELD_EVENT_TYPE,
                    value?: any,
                    event?: Event
                } = {}) {
        Object.assign(this, obj);
    }
}

export enum FIELD_EVENT_TYPE {
    BLUR,
    FOCUS,
    CHANGE,
    CLICK
}
