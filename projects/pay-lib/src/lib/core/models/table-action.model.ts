import { ActionItem } from './action-item.model';
import { ITableRowData } from '../interfaces/table-row-data.interface';

export class TableAction extends ActionItem {
    items: Array<ITableRowData>;
}
