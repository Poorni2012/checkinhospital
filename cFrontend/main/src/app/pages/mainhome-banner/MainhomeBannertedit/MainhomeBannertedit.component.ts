import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'ngx-MainhomeBannertedit',
  templateUrl: './MainhomeBannertedit.component.html',
  styleUrls: ['./MainhomeBannertedit.component.scss']
})
export class MainhomeBannerteditComponent implements OnInit {
  bannertwoObj: any = {};
  currentId: any;
  onSubmit: boolean = false;
  onDisabled: boolean;
  image: any = '';
  logoImage: any = ''

  ckeConfig: any = {};

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    public spinnerService: NgxSpinnerService,
    public _sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.currentId && this.currentId != '') {
      this.getCurrentBannertwoDetails(this.currentId);
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

    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }


  getCurrentBannertwoDetails(_id: any) {
    this.spinnerService.show()
    if (_id && _id != '') {
      this.apiService.postRequest('admin/singleBanner', { id: _id }).subscribe((bannertwoResponse: any) => {
        if (bannertwoResponse.status) {
          this.bannertwoObj = bannertwoResponse.data;
          this.spinnerService.hide()
        }
        else {
          this.bannertwoObj = {};
          this.spinnerService.hide()
        }
      })
    }
  }


  onSelectIeoFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var fileType = event.target.files[0].type;
      if (
        fileType != 'image/png' &&
        fileType != 'image/jpg' &&
        fileType != 'image/jpeg' &&
        fileType != 'image/svg+xml'
      ) {
        return this.toastrService.danger("Invalid image format.", 'Error !!');;
      }
      var reader = new FileReader();
      let file = event.target.files[0];
      this.image = file;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.bannertwoObj.image = event.target.result;
      }
    }

  }

  editBannerTwoDetails(bannertwoEditForm: NgForm) {
    this.onSubmit = true

    if (bannertwoEditForm.valid) {
      this.onDisabled = true
      this.spinnerService.show()
      let formData = new FormData()
      formData.append('_id', this.bannertwoObj._id);
      formData.append('content', this.bannertwoObj.content);
      if (this.image && this.image != '') {
        formData.append('image', this.image);
      } else {
        formData.append('image', this.bannertwoObj.image);
      }
      this.apiService.postRequest('admin/editBanner', formData).subscribe((updateBannertwoResponse: any) => {
        if (updateBannertwoResponse.status) {
          this.toastrService.success(updateBannertwoResponse.message, 'Success');
          this.router.navigate([`/pages/mainhome-banner-management`]);
          this.onSubmit = false
          this.onDisabled = false
        }
        else {
          this.toastrService.danger(updateBannertwoResponse.message, 'Error !!');
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
