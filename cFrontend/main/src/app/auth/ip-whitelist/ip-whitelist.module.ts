import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpWhitelistComponent } from './ip-whitelist.component';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':token',
    component: IpWhitelistComponent
  }
];

@NgModule({
  declarations: [
    IpWhitelistComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    ThemeModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class IpWhitelistModule { }
