import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTokenComponent } from './list-token/list-token.component';
import { AddTokenComponent } from './add-token/add-token.component';
import { EditTokenComponent } from './edit-token/edit-token.component';
import { RouterModule, Routes } from '@angular/router';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '',
    component: ListTokenComponent
  },
  {
    path: 'add',
    component: AddTokenComponent
  },
  {
    path: 'edit/:id',
    component: EditTokenComponent
  }
];



@NgModule({
  declarations: [
    ListTokenComponent,
    AddTokenComponent,
    EditTokenComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    SharedModule,
    CKEditorModule,
    NgbPaginationModule,
    PaginationModule.forRoot(),
    RouterModule.forChild(routes)]
})
export class P2pTokenmanagemenentModule { }

















