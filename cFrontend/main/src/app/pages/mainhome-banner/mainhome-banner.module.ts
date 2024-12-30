import { NgModule } from '@angular/core';
import { MainhomeBanneraddComponent } from './MainhomeBanneradd/MainhomeBanneradd.component';
import { MainhomeBannerteditComponent } from './MainhomeBannertedit/MainhomeBannertedit.component';
import { HomeBannerComponent } from './mainhome-banner.component';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NbListModule } from '@nebular/theme';

const routes: Routes = [
  {
    path: '',
    component: HomeBannerComponent
  },
  {
    path: 'addbannert',
    component: MainhomeBanneraddComponent
  },
  {
    path: 'editbannert/:id',
    component: MainhomeBannerteditComponent
  }];


@NgModule({
  declarations: [
    HomeBannerComponent,
    MainhomeBanneraddComponent,
    MainhomeBannerteditComponent
  ],
  imports: [
    ThemeModule,
    SharedModule,
    CKEditorModule,
    NgbPaginationModule,
    NbListModule,
    PaginationModule.forRoot(),
    RouterModule.forChild(routes)]
  
})
export class MainhomeBannerModule { }