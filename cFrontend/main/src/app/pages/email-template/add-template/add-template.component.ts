import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss']
})
export class AddTemplateComponent implements OnInit {

  emailTemplateObj: any = {};
  onSubmit: boolean = false;
  ckeConfig: any = {};

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
      height: 300,
      removeDialogTabs: 'image:advanced;link:advanced',
      format_tags: 'p;h1;h2;h3;pre;div'
    }
  }

  addEmailTemplate(addEmailTemplateForm: NgForm) {
    this.onSubmit = true;
    if (addEmailTemplateForm.valid) {
      this.spinnerService.show()
      this.apiService.postRequest('admin/add_email_template', this.emailTemplateObj).subscribe((templateResponse: any) => {
        if (templateResponse.status) {
          this.toastrService.success(templateResponse.message, 'Success');
          this.router.navigate([`/pages/email-template`]);
          this.onSubmit = false;

        }
        else {
          this.toastrService.danger(templateResponse.message, 'Error !!');
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 50);
      })
    }
    else {
      this.toastrService.danger('Please fill the required fields', 'Error !!');
    }
  }

}
