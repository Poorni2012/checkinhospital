import { NgModule } from '@angular/core';
import { ChangePatternComponent } from './change-pattern.component';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ChangePatternComponent
  }
];

@NgModule({
  declarations: [
    ChangePatternComponent
  ],
  imports: [
    ThemeModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ChangePatternModule { }
