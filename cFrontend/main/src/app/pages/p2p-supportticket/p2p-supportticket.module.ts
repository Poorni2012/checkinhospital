import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSupportticketComponent } from './list-supportticket/list-supportticket.component';
import { EditSupportticketComponent } from './edit-supportticket/edit-supportticket.component';

import { RouterModule, Routes } from '@angular/router';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

const routes: Routes = [
  {
    path: '',
    component: ListSupportticketComponent
  },
 
  {
    path: 'edit/:id',
    component: EditSupportticketComponent
  }
];




@NgModule({
  declarations: [
    ListSupportticketComponent,
    EditSupportticketComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    SharedModule,
    CKEditorModule,
    NgbPaginationModule,
    MalihuScrollbarModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule.forChild(routes)  ]  
})
export class P2pSupportticketModule { }





















