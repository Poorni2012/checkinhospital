import { NgModule } from '@angular/core';
import { HomepageComponent } from './homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { CKEditorModule } from 'ng2-ckeditor';
const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  }
];

@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    ThemeModule,
    SharedModule,
    RouterModule.forChild(routes),
    CKEditorModule
  ]
})
export class HomepageModule { }
