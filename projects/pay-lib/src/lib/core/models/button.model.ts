import { ActionItem } from './action-item.model';

//used for showing buttons on table (not for editable table)
export class ButtonActionItem extends ActionItem {
    type: string; // Button/Link
    color?: string; // primary, secondary
    handler: Function;
    icon?: string;
}