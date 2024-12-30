import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ApiService } from '../../../service/api/api.service';
import '../ckeditor.loader';
import 'ckeditor';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-MainhomeBanneradd',
  templateUrl: './MainhomeBanneradd.component.html',
  styleUrls: ['./MainhomeBanneradd.component.scss']
})
export class MainhomeBanneraddComponent implements OnInit {

  onSubmit: boolean;
  onDisabled: boolean;
  bannertwoObj: any = {};
  logoImage: any = ''
  image: any = '';

  ckeConfig: any = {};

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService,
    public _sanitizer: DomSanitizer,
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

    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
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

  addBannerTwoDetails(bannertwoAddForm: NgForm) {
    this.onSubmit = true
    if (bannertwoAddForm.valid) {
      this.spinnerService.show()
      let formData = new FormData()
      formData.append('title', this.bannertwoObj.title);
      formData.append('content', this.bannertwoObj.content);
      if (this.image && this.image != '') {
        formData.append('image', this.image);
      } else {
        formData.append('image', this.bannertwoObj.image);
      }
      this.onDisabled = true
      this.apiService.postRequest('admin/createBanner', formData).subscribe((bannertwoObj: any) => {
        if (bannertwoObj.status) {
          this.toastrService.success(bannertwoObj.message, 'Success');
          this.router.navigate([`/pages/mainhome-banner-management`]);
          this.onSubmit = false
          this.onDisabled = false
        }
        else {
          this.toastrService.danger(bannertwoObj.message, 'Error !!');
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
