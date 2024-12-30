import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackhistoryComponent } from './feedbackhistory.component';
import { RouterModule, Routes } from '@angular/router';
import { NbTabsetModule } from '@nebular/theme';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';

const routes: Routes = [
  {
    path: '',
    component: FeedbackhistoryComponent
  }
];


@NgModule({
  declarations: [
    FeedbackhistoryComponent],
  imports: [
    CommonModule,
    ThemeModule,
    SharedModule,
    CKEditorModule,
    NgbPaginationModule,
    PaginationModule.forRoot(),
    NbTabsetModule,
    RouterModule.forChild(routes),
  ]
})
export class FeedbackhistoryModule { }
