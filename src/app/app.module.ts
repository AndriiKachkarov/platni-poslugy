import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
