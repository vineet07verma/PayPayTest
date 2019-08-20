import { QuickAssign } from './quickassign.model';
import { ITableRowData } from '../interfaces/table-row-data.interface';

export class TableRowData extends QuickAssign implements ITableRowData {
    edit: boolean;
    focus: boolean;
    editError: {} = {};
    hidden: boolean = false;
    selected: boolean = false;
    path: string;
    singleActions: boolean = true;
    editDisabled: Array<string>;
    editedFields: {} = {};
}
