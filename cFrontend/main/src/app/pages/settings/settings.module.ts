import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { CKEditorModule } from 'ng2-ckeditor';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  }
];

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    ThemeModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class SettingsModule { }
