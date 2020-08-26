import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule, Provider} from '@angular/core';
import localeRu from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {LoginComponent} from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ClientComponent } from './main-layout/client/client.component';
import { InvoiceComponent } from './main-layout/invoice/invoice.component';
import { MainPageComponent } from './main-layout/main-page/main-page.component';
import { CertificationComponent } from './main-layout/main-page/certification/certification.component';
import { HeaderComponent } from './main-layout/main-page/header/header.component';
import { MonitoringComponent } from './main-layout/main-page/monitoring/monitoring.component';
import { ServicePacksComponent } from './main-layout/main-page/service-packs/service-packs.component';
import { TableComponent } from './main-layout/main-page/table/table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/auth.interceptor';
import {environment} from '../environments/environment';
import {ServiceWorkerModule} from '@angular/service-worker';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localeRu, 'ru');

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainLayoutComponent,
    ClientComponent,
    InvoiceComponent,
    MainPageComponent,
    CertificationComponent,
    HeaderComponent,
    MonitoringComponent,
    ServicePacksComponent,
    TableComponent
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
