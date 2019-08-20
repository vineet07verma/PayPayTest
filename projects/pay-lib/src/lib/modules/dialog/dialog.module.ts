import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { ButtonModule } from './../button/button.module';
import { DialogComponent } from './dialog.component';
import { DialogService } from './../../core/services/dialog.service';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        ButtonModule
    ],
    declarations: [
        DialogComponent
    ],
    entryComponents: [
        DialogComponent
    ],
    providers: [
        DialogService
    ],
    exports: []
})
export class DialogModule {
}
