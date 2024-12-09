import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckinhistoryComponent } from './checkinhistory.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: CheckinhistoryComponent
  }
];

@NgModule({
  declarations: [
    CheckinhistoryComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbPaginationModule,
  ]
})
export class CheckinhistoryModule { }
