import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqManagementComponent } from './faq-management.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '../../shared/shared.module';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { EditFaqComponent } from './edit-faq/edit-faq.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: FaqManagementComponent
  },
  {
    path: 'add',
    component: AddFaqComponent
  },
  {
    path: 'edit/:id',
    component: EditFaqComponent
  }
];

@NgModule({
  declarations: [
    FaqManagementComponent,
    AddFaqComponent,
    EditFaqComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CKEditorModule,
    NgbPaginationModule,
    PaginationModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class FaqManagementModule { }
