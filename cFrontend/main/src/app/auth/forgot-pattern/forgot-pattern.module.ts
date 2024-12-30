import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPatternComponent } from './forgot-pattern.component';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ForgotPatternComponent
  },
  {
    path: ':id',
    component: ForgotPatternComponent
  }
];

@NgModule({
  declarations: [
    ForgotPatternComponent
  ],
  imports: [
    ThemeModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ForgotPatternModule { }
