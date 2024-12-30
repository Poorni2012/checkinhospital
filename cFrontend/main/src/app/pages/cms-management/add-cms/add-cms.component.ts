import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-add-cms',
  templateUrl: './add-cms.component.html',
  styleUrls: ['./add-cms.component.scss']
})
export class AddCmsComponent implements OnInit {

  cmsObj: any = {};
  onSubmit: boolean = false;
  onDisabled: boolean = false;
  ckeConfig: { uiColor: string; toolbarGroups: ({ name: string; groups: string[]; } | { name: string; groups?: undefined; })[]; skin: string; resize_enabled: boolean; removePlugins: string; extraPlugins: string; colorButton_foreStyle: { element: string; attributes: { color: string; }; }; height: number; removeDialogTabs: string; removeButtons: string; format_tags: string; };

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.ckeConfig = {
      uiColor: '#ffffff',
      toolbarGroups: [{ name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
      { name: 'links' }, { name: 'insert' },
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },
      { name: 'styles' },
      { name: 'colors' }],
      skin: 'kama',
      resize_enabled: false,
      removePlugins: 'elementspath,save,magicline',
      extraPlugins: 'sourcedialog,divarea,smiley,justify,indentblock,colordialog',
      colorButton_foreStyle: {
        element: 'font',
        attributes: { 'color': '#(color)' }
      },
      height: 500,
      removeDialogTabs: 'image:advanced;link:advanced',
      removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
      format_tags: 'p;h1;h2;h3;pre;div'
    }
  }

  addCmsDetails(cmsAddForm: NgForm) {
    this.onSubmit = true

    if (cmsAddForm.valid) {
      this.spinnerService.show()
      this.onDisabled = true
      this.apiService.postRequest('admin/addcms', this.cmsObj).subscribe((cmsResponse: any) => {
        if (cmsResponse.status) {
          this.toastrService.success(cmsResponse.message, 'Success');
          this.router.navigate([`/pages/cms-management`]);
          this.onSubmit = false
          this.onDisabled = false

        }
        else {
          this.toastrService.danger(cmsResponse.message, 'Error !!');
          this.onDisabled = false
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 50);
      })
    }
    else {
      this.toastrService.danger('Please fill the required fields', 'Error !!');
      this.onDisabled = false
    }
  }
}
