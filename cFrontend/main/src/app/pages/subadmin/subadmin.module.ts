import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddsubadminComponent } from './addsubadmin/addsubadmin.component';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule, Routes } from '@angular/router';
import { SubadminComponent } from './subadmin.component';
import { EditsubadminComponent } from './editsubadmin/editsubadmin.component';
import { NbDialogModule } from '@nebular/theme';

const routes: Routes = [
  {
    path: '',
    component: SubadminComponent
  },
  {
    path: 'add',
    component: AddsubadminComponent
  },
  {
    path: 'edit/:id',
    component: EditsubadminComponent
  }
];


@NgModule({
  declarations: [
    SubadminComponent,
    AddsubadminComponent,
    EditsubadminComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    SharedModule,
    CKEditorModule,
    NgbPaginationModule,
    NbDialogModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class SubadminModule { }





