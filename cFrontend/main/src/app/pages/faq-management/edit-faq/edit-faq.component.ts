import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'ngx-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.scss']
})
export class EditFaqComponent implements OnInit {
  onSubmit: boolean = false;
  ckeConfig: { uiColor: string; toolbarGroups: ({ name: string; groups: string[]; } | { name: string; groups?: undefined; })[]; skin: string; resize_enabled: boolean; removePlugins: string; extraPlugins: string; colorButton_foreStyle: { element: string; attributes: { color: string; }; }; height: number; removeDialogTabs: string; removeButtons: string; format_tags: string; };

  constructor(public apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    public spinnerService: NgxSpinnerService
  ) { }

  editFaqObj: any = {};
  currentId: any;

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.currentId && this.currentId != '') {
      this.getCurrentFaqDetails(this.currentId);
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
      removePlugins: 'elementspath,save,magicline',
      extraPlugins: 'sourcedialog,divarea,smiley,justify,indentblock,colordialog',
      colorButton_foreStyle: {
        element: 'font',
        attributes: { 'color': '#(color)' }
      },
      height: 300,
      removeDialogTabs: 'image:advanced;link:advanced',
      removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
      format_tags: 'p;h1;h2;h3;pre;div'
    }
  }

  getCurrentFaqDetails(_id: any) {
    this.spinnerService.show()
    if (_id && _id != '') {
      this.apiService.postRequest('admin/getfaq', { id: _id }).subscribe((cmsCurrentResponse: any) => {
        if (cmsCurrentResponse.status) {
          this.editFaqObj = cmsCurrentResponse.data;
          this.spinnerService.hide()
        }
        else {
          this.editFaqObj = {};
          this.spinnerService.hide()
        }
      })
    }
  }



  editFaqDetails(editfaqForm: NgForm) {
    this.onSubmit = true
    if (editfaqForm.valid) {
      this.spinnerService.show()
      this.apiService.postRequest('admin/updateFaq', this.editFaqObj).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.toastrService.success(updateResponse.message, 'Success');
          this.router.navigate([`/pages/faq-management`]);
          this.onSubmit = false
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
      this.toastrService.danger('Please fill the required fields', 'Error !!');
    }
  }


}
