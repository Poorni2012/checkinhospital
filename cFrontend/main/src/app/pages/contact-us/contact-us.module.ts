import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContactusComponent } from './list-contactus/list-contactus.component';
import { ViewContactusComponent } from './view-contactus/view-contactus.component';
import { RouterModule, Routes } from '@angular/router';
import { NbAccordionModule, NbCardModule, NbIconModule, NbTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: ListContactusComponent
  },

  {
    path: 'edit/:id',
    component: ViewContactusComponent
  }
];

@NgModule({
  declarations: [
    ListContactusComponent,
    ViewContactusComponent
  ],
  imports: [
    NbAccordionModule,
    CommonModule,
    ThemeModule,
    SharedModule,
    CKEditorModule,
    NgbPaginationModule,
    NgxSpinnerModule,
    PaginationModule.forRoot(),
    NbTabsetModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactUsModule { }













