import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import { ListPaymentComponent } from './list-payment/list-payment.component';
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
    component: ListPaymentComponent
  },
  {
    path: 'add',
    component: AddPaymentComponent
  },
  {
    path: 'edit/:id',
    component: EditPaymentComponent
  }
];

@NgModule({
  declarations: [
    AddPaymentComponent,
    EditPaymentComponent,
    ListPaymentComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    ThemeModule,
    SharedModule,
    CKEditorModule,
    NgbPaginationModule,
    PaginationModule.forRoot(),
    RouterModule.forChild(routes)  ]
})
export class P2pPaymentManagementModule { }










