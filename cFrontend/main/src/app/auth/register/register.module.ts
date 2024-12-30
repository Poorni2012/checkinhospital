import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  }
];


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class RegisterModule { }
