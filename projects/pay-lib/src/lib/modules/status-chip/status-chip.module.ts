import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material';

import { StatusChipComponent } from './status-chip.component';

@NgModule({
    declarations: [
        StatusChipComponent
    ],
    imports: [
        CommonModule,
        MatChipsModule
    ],
    exports: [
        StatusChipComponent
    ]
})
export class StatusChipModule { }
