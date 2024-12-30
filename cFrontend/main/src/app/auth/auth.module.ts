import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ThemeModule } from '../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbUserModule } from '@nebular/theme';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path:'register',
      loadChildren:()=> import('./register/register.module').then(m=>m.RegisterModule),
    },
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    },
    {
      path: 'forgot-password',
      loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    },
    {
      path: 'forgot-pattern',
      loadChildren: () => import('./forgot-pattern/forgot-pattern.module').then(m => m.ForgotPatternModule),
    },
    {
      path: 'ip-whitelist',
      loadChildren: () => import('./ip-whitelist/ip-whitelist.module').then(m => m.IpWhitelistModule),
    },
    {
      path: '',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    }
  ]
}];



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    ThemeModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
