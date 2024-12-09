import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthenticationSettingsComponent } from './authentication-settings.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationSettingsComponent
  }
];

@NgModule({
  declarations: [
    AuthenticationSettingsComponent
  ],
  imports: [
    ThemeModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthenticationSettingsModule { }
