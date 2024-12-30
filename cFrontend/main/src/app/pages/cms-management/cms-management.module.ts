import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsManagementComponent } from './cms-management.component';
import { RouterModule, Routes } from '@angular/router';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AddCmsComponent } from './add-cms/add-cms.component';
import { EditCmsComponent } from './edit-cms/edit-cms.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: CmsManagementComponent
  },
  {
    path: 'add',
    component: AddCmsComponent
  },
  {
    path: 'edit/:id',
    component: EditCmsComponent
  }
];

@NgModule({
  declarations: [
    CmsManagementComponent,
    AddCmsComponent,
    EditCmsComponent,
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
export class CmsManagementModule { }
