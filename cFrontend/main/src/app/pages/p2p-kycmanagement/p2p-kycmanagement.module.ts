import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListKycdetailsComponent } from './list-kycdetails/list-kycdetails.component';
import { EditKycdetailsComponent } from './edit-kycdetails/edit-kycdetails.component';
import { RouterModule, Routes } from '@angular/router';
import { NbAccordionModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: ListKycdetailsComponent
  },
   {
    path: 'edit/:id',
    component: EditKycdetailsComponent
  }
];


@NgModule({
  declarations: [
    ListKycdetailsComponent,
    EditKycdetailsComponent
  ],
  imports: [
    NbAccordionModule,
    CommonModule,
    ThemeModule,
    SharedModule,
    CKEditorModule,
    NgbPaginationModule,
    PaginationModule.forRoot(),
    RouterModule.forChild(routes) 
  ]
})
export class P2pKycmanagementModule { }









 




