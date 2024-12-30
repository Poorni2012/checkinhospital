import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListTransferHistoryComponent } from './list-transfer-history/list-transfer-history.component';

const routes: Routes = [
  {
    path: '',
    component: ListTransferHistoryComponent
  },
 

];

@NgModule({
  declarations: [
    ListTransferHistoryComponent,
  ],
  imports: [
    ThemeModule,
    SharedModule,
    NgbPaginationModule,
    PaginationModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class InternalTransferHistoryModule { }
