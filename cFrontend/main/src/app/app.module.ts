/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbBadgeModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { ConfirmationDialogComponent } from './service/Confirm/confirmation-dialog/confirmation-dialog.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './service/Confirm/confirmation-dialog.service';

@NgModule({
  declarations: [AppComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NgxSpinnerModule,
    FormsModule,
    NgbModule,
    NbBadgeModule,
  ],
  exports: [
    SharedModule,
    FormsModule
  ],
  entryComponents: [ConfirmationDialogComponent,],
  providers: [ConfirmationDialogService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
