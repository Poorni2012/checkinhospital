import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsermanagementComponent } from './list-usermanagement/list-usermanagement.component';
import { ViewUsermanagementComponent } from './view-usermanagement/view-usermanagement.component';


import { RouterModule, Routes } from '@angular/router';
import { NbAccordionModule, NbCardModule, NbIconModule, NbTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';

const routes: Routes = [
  {
    path: '',
    component: ListUsermanagementComponent
  },
   {
    path: 'edit/:id',
    component: ViewUsermanagementComponent
  },
];

@NgModule({
  declarations: [
    ListUsermanagementComponent,
    ViewUsermanagementComponent
  ],
  imports: [
    NbAccordionModule,
    CommonModule,
    ThemeModule,
    SharedModule,
    CKEditorModule,
    NgbPaginationModule,
    PaginationModule.forRoot(),
    NbTabsetModule,
    RouterModule.forChild(routes) ,
    TabsModule.forRoot(),
  ]
})
export class P2pUsermanagementModule { }



 




