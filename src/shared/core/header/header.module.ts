import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule, MatToolbarModule, MatMenuModule, MatListModule, MatButtonModule } from '@angular/material';

import { HeaderComponent } from './header.component';
import { NavComponent } from './nav/nav.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MobileSidenavComponent } from './mobile-sidenav/mobile-sidenav.component';

@NgModule({
	declarations: [
        HeaderComponent,
        NavComponent,
        UserProfileComponent,
        MobileSidenavComponent
	],
	imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatButtonModule
    ],
    entryComponents: [
        MobileSidenavComponent
    ],
	providers: [],
	exports: [
        HeaderComponent
    ]
})
export class HeaderModule { }
