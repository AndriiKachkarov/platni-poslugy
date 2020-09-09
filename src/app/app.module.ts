import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule, Provider} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainPageComponent } from './main-layout/main-page/main-page.component';
import {AppRoutingModule} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvoiceComponent } from './main-layout/invoice/invoice.component';
import { TableComponent } from './main-layout/main-page/table/table.component';
import { HeaderComponent } from './main-layout/main-page/header/header.component';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/auth.interceptor';
import { ClientComponent } from './main-layout/client/client.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {ServicePacksComponent} from './main-layout/main-page/service-packs/service-packs.component';
import { CertificationComponent } from './main-layout/main-page/certification/certification.component';
import { MonitoringComponent } from './main-layout/main-page/monitoring/monitoring.component';
import { AdditionalComponent } from './main-layout/main-page/additional/additional.component';

registerLocaleData(localeRu, 'ru');

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    InvoiceComponent,
    TableComponent,
    HeaderComponent,
    ServicePacksComponent,
    LoginComponent,
    ClientComponent,
    CertificationComponent,
    MonitoringComponent,
    AdditionalComponent,
  ],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ],
  providers: [
    INTERCEPTOR_PROVIDER,
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
