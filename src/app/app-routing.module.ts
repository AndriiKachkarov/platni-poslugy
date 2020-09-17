import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {MainPageComponent} from './main-layout/main-page/main-page.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {InvoiceComponent} from './main-layout/invoice/invoice.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/auth.guard';
import {ClientComponent} from './main-layout/client/client.component';
import {PreviousRouteRecorderService} from './services/previous-route-recorder.service';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'stats', loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule)
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [AuthGuard],  children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: MainPageComponent, canDeactivate: [PreviousRouteRecorderService]},
      {path: 'invoice', component: InvoiceComponent, canDeactivate: [PreviousRouteRecorderService]},
      {path: 'client', component: ClientComponent, canDeactivate: [PreviousRouteRecorderService]},
    ]
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
