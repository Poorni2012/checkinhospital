import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'ngx-edit-cms',
  templateUrl: './edit-cms.component.html',
  styleUrls: ['./edit-cms.component.scss']
})
export class EditCmsComponent implements OnInit {

  cmsObj: any = {};
  currentId: any;
  onSubmit: boolean = false;
  onDisabled: boolean;
  ckeConfig: { uiColor: string; toolbarGroups: ({ name: string; groups: string[]; } | { name: string; groups?: undefined; })[]; skin: string; resize_enabled: boolean; removePlugins: string; extraPlugins: string; colorButton_foreStyle: { element: string; attributes: { color: string; }; }; height: number; removeDialogTabs: string; removeButtons: string; format_tags: string; };

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
      this.getCurrentCmsDetails(this.currentId);
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
      height: 500,
      removeDialogTabs: 'image:advanced;link:advanced',
      removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
      format_tags: 'p;h1;h2;h3;pre;div'
    }
  }


  getCurrentCmsDetails(_id: any) {
    this.spinnerService.show()
    if (_id && _id != '') {
      this.apiService.postRequest('admin/get_one_cms', { id: _id }).subscribe((cmsCurrentResponse: any) => {
        if (cmsCurrentResponse.status) {
          this.cmsObj = cmsCurrentResponse.data;
          this.spinnerService.hide()
        }
        else {
          this.cmsObj = {};
          this.spinnerService.hide()
        }
      })
    }
  }

  editCmsDetails(cmsEditForm: NgForm) {
    this.onSubmit = true

    if (cmsEditForm.valid) {
      this.spinnerService.show()
      this.onDisabled = true
      this.apiService.postRequest('admin/update_cms', this.cmsObj).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.toastrService.success(updateResponse.message, 'Success');
          this.router.navigate([`/pages/cms-management`]);
          this.onSubmit = false
          this.onDisabled = false
        }
        else {
          this.toastrService.danger(updateResponse.message, 'Error !!');
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
