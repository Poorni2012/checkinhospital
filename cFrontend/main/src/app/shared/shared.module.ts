import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NbActionsModule, NbBadgeModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbPopoverModule, NbRadioModule, NbSelectModule, NbToastrModule, NbToggleModule, NbTooltipModule, NbUserModule } from '@nebular/theme';


@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbBadgeModule,
    NbToggleModule,
    NbToastrModule,
    NbFormFieldModule,
    NbPopoverModule,
    NbTooltipModule,
    NbButtonGroupModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbBadgeModule,
    NbToggleModule,
    NbToastrModule,
    NbFormFieldModule,
    NbPopoverModule,
    NbTooltipModule,
    NbButtonGroupModule
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }