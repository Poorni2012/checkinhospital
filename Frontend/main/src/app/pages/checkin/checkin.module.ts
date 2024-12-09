import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckinComponent } from './checkin.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CheckinComponent
  }
];

@NgModule({
  declarations: [
    CheckinComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class CheckinModule { }
