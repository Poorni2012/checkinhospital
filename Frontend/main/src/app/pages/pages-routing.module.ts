import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },

    {
      path: 'checkin',
      loadChildren: () => import('./checkin/checkin.module').then(m => m.CheckinModule)
    },
    {
      path: 'checkinhistory',
      loadChildren: () => import('./checkinhistory/checkinhistory.module').then(m => m.CheckinhistoryModule),
    },
    {
      path: 'change-password',
      loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule),
    },
    {
      path: 'change-pattern',
      loadChildren: () => import('./change-pattern/change-pattern.module').then(m => m.ChangePatternModule),
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
