import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListP2pordermanagementComponent } from './list-p2pordermanagement/list-p2pordermanagement.component';
import { ViewP2pordermanagementComponent } from './view-p2pordermanagement/view-p2pordermanagement.component';

import { RouterModule, Routes } from '@angular/router';
import { NbAccordionModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
 
const routes: Routes = [
  {
    path: '',
    component: ListP2pordermanagementComponent
  },
   {
    path: 'edit/:order_no',
    component: ViewP2pordermanagementComponent
  }
];

@NgModule({
  declarations: [
    ListP2pordermanagementComponent,
    ViewP2pordermanagementComponent
  ],
  imports: [
    NbAccordionModule,
    CommonModule,
    ThemeModule,
    SharedModule,
    CKEditorModule,
    NgbPaginationModule,
    FormsModule,
    PaginationModule.forRoot(),
    MalihuScrollbarModule.forRoot(),
    RouterModule.forChild(routes)  
  ]
})
export class P2pOrdermanagementModule { }


