import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent
  },
  {
    path: ':id',
    component: ForgotPasswordComponent
  }
];

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    ThemeModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ForgotPasswordModule { }
