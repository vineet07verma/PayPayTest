export class AlertModel {
    message: string;
    className: string;
    duration?: number = 6000;
    autoDismissable?: boolean = true;

    constructor(obj) {
        return Object.assign(this, obj);
    }
}