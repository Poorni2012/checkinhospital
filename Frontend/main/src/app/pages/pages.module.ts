import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundModule } from './not-found/not-found.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NotFoundModule,
    SharedModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
