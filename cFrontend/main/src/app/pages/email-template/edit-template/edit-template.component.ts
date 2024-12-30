import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {

  emailTemplateObj: any = {};
  currentId: any;
  onSubmit: boolean = false;
  ckeConfig: any = {};

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    public spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.currentId && this.currentId != '') {
      this.getCurrentEmailTemplate(this.currentId);
    }
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
      removePlugins: 'save',
      extraPlugins: 'sourcedialog,divarea',
      colorButton_foreStyle: {
        element: 'font',
        attributes: { 'color': '#(color)' }
      },
      height: 300,
      removeDialogTabs: 'image:advanced;link:advanced',
      format_tags: 'p;h1;h2;h3;pre;div'
    }
  }


  getCurrentEmailTemplate(_id: any) {
    this.spinnerService.show()
    if (_id && _id != '') {
      this.apiService.postRequest('admin/get_email_template', { id: _id }).subscribe((templateCurrentResponse: any) => {
        if (templateCurrentResponse.status) {
          this.emailTemplateObj = templateCurrentResponse.data;
          this.spinnerService.hide()
        }
        else {
          this.emailTemplateObj = {};
          this.spinnerService.hide()
        }
      })
    }
  }

  editEmailTemplate(editEmailTemplateForm: NgForm) {
    this.onSubmit = true;
    if (editEmailTemplateForm.valid) {
      this.spinnerService.show()
      this.apiService.postRequest('admin/update_email_template', this.emailTemplateObj).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.toastrService.success(updateResponse.message, 'Success');
          this.router.navigate([`/pages/email-template`]);
          this.onSubmit = false;

        }
        else {
          this.toastrService.danger(updateResponse.message, 'Error !!');
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 50);
      })
    }
    else {
      this.toastrService.success('Please fill the required fields', 'Error !!');
    }
  }
}
