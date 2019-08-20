import { FIELD_TYPE, ORDER_TYPE, ALIGNMENT, EDIT_TYPE } from '../constants/index';

export interface ITableHeaderItem {
    label: string;
    field: string;
    order?: string;
    orderField?: string;
    OrderType?: ORDER_TYPE;
    filter?: boolean;
    fieldType?: FIELD_TYPE;
    width?: string;
    align?: ALIGNMENT;
    sortingRequired?: boolean;
    cellClickable?: boolean;
    editOptions?: any;
    editType?: EDIT_TYPE;
    editRequired?: boolean;
    editPlaceholder?: string;
}
