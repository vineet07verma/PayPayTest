import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { SpinnerComponent } from './spinner/spinner.component';
import { PendingInterceptorService, PendingInterceptorServiceFactoryProvider } from './pending-interceptor.service';

const PendingInterceptorServiceExistingProvider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: PendingInterceptorService,
    multi: true
};

@NgModule({
    declarations: [
        SpinnerComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    exports: [
        SpinnerComponent
    ],
    providers: [
        PendingInterceptorServiceExistingProvider,
        PendingInterceptorServiceFactoryProvider,
    ]
})
export class LoaderModule {
}