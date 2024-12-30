import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P2pWithdrwahistoryComponent } from './p2p-withdrwahistory/p2p-withdrwahistory.component';
import { RouterModule, Routes } from '@angular/router';
import { NbAccordionModule, NbCardModule, NbIconModule, NbTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewWithdrawDataComponent } from './view-withdraw-data/view-withdraw-data.component';


const routes: Routes = [
  {
    path: '',
    component: P2pWithdrwahistoryComponent
  },
  {
    path: 'view/:id',
    component: ViewWithdrawDataComponent
  }

];
@NgModule({
  declarations: [
    P2pWithdrwahistoryComponent,
    ViewWithdrawDataComponent
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
    RouterModule.forChild(routes)]
})
export class P2pWithdrawhistoryModule { }


























