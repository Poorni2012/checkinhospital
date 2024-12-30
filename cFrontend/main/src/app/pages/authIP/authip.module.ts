import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule, Routes } from '@angular/router';
import { NbDialogModule } from '@nebular/theme';
import { AuthipComponent } from './authip.component';
import { AddauthIpComponent } from './addauthip/addauthip.component';

const routes: Routes = [
  {
    path: '',
    component: AuthipComponent
  },
  {
    path: 'add',
    component: AddauthIpComponent
  } 
];


@NgModule({
  declarations: [
    AuthipComponent,
    AddauthIpComponent,    
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
export class AuthIpModule { }





