import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoaderModule, PayLibModule } from 'pay-lib';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NoopInterceptor } from './http.interceptor';
import { ErrorService, UserService } from '../shared/services/index';
import { SidenavModule } from 'src/shared/core/sidenav/sidenav.module';
import { HeaderModule } from './../shared/core/header/header.module';
import { FooterComponent } from 'src/shared/core/footer/footer.component';
import { PerformanceReviewService } from './../shared/services/performance-review.service';
@NgModule({
	declarations: [
		AppComponent,
		FooterComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		PayLibModule,
		LoaderModule,
		AppRoutingModule,
		SidenavModule,
		AuthModule,
		HeaderModule
	],
	entryComponents: [
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: NoopInterceptor,
			multi: true
		},
		ErrorService,
		UserService,
		PerformanceReviewService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
