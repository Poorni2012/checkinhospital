import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NbAccordionModule, NbCardModule, NbIconModule, NbTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewListingDataComponent } from './view-listing-data/view-listing-data.component';
import { ListingPostComponent } from './Listing/listingpost.component';


const routes: Routes = [
  {
    path: '',
    component: ListingPostComponent
  },
  {
    path: 'view/:id',
    component: ViewListingDataComponent
  }

];
@NgModule({
  declarations: [
    ListingPostComponent,
    ViewListingDataComponent
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
export class P2pListingModule { }


























