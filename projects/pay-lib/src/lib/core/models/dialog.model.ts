import { ButtonActionItem } from './button.model';

export class DialogModel {
    title: string;
    message?: string;
    component?: any;
    componentData?: any;
    width?: string = '400px';
    actions?: Array<ButtonActionItem>;

    constructor(obj) {
        return Object.assign(this, obj);
    }
}