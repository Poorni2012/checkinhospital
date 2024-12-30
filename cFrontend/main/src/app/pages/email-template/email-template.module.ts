import { NgModule } from '@angular/core';
import { EmailTemplateComponent } from './email-template.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '../../shared/shared.module';
import { AddTemplateComponent } from './add-template/add-template.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ThemeModule } from '../../@theme/theme.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: EmailTemplateComponent
  },
  {
    path: 'add',
    component: AddTemplateComponent
  },
  {
    path: 'edit/:id',
    component: EditTemplateComponent
  }
];

@NgModule({
  declarations: [
    EmailTemplateComponent,
    AddTemplateComponent,
    EditTemplateComponent
  ],
  imports: [
    ThemeModule,
    SharedModule,
    CKEditorModule,
    NgbPaginationModule,
    PaginationModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class EmailTemplateModule { }
