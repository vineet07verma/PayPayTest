import { ComponentType } from '@angular/cdk/portal';

export class SidenavModel {
    component: any;
    componentData?: any;
    position: string = 'start';

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}