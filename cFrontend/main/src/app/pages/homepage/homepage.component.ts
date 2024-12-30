import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../service/api/api.service';

@Component({
  selector: 'ngx-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  selectedItem: any;
  onSubmit: boolean;
  sitemode: any
  getHomeObj: any = {};
  logoImage: any = ''
  ieoImage: any = '';
  image3: any = ''
  image4: any = '';
  featureImage: any = '';
  favIcon: any = '';
  ckeConfig: { uiColor: string; toolbarGroups: ({ name: string; groups: string[]; } | { name: string; groups?: undefined; })[]; skin: string; resize_enabled: boolean; removePlugins: string; extraPlugins: string; colorButton_foreStyle: { element: string; attributes: { color: string; }; }; height: number; removeDialogTabs: string; removeButtons: string; format_tags: string; };
  Image3: any = '';
  Image4: any = '';

  constructor(
    private apiService: ApiService,
    public router: Router, public _sanitizer: DomSanitizer,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getHomeDetails();
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
      height: 100,
      removeDialogTabs: 'image:advanced;link:advanced',
      removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
      format_tags: 'p;h1;h2;h3;pre;div'
    }
    let url=this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }


  getHomeDetails() {
    this.spinnerService.show()
    this.apiService.getRequest('admin/listHomePage').subscribe((homeResponse: any) => {

      if (homeResponse.status) {
        this.getHomeObj = homeResponse.data;
        this.selectedItem = this.getHomeObj.site_mode;
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
      }

    })
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
      this.ieoImage = file;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.getHomeObj.image_1 = event.target.result;
      }
    }

  }


  onSelectFeatureFile(event: any) {
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
      this.featureImage = file;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.getHomeObj.image_2 = event.target.result;
      }
    }

  }

  onSelectImage3(event: any) {
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
      this.Image3 = file;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.getHomeObj.image_3 = event.target.result;
      }
    }

  }

  onSelectImage4(event: any) {
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
      this.Image4 = file;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.getHomeObj.image_4 = event.target.result;
      }
    }

  }

  updateHomeContent(homeContentForm: NgForm) {
    this.onSubmit = true;
    if (homeContentForm.valid) {
      this.spinnerService.show()
      let formData = new FormData()
      formData.append('title_1', this.getHomeObj.title_1)
      formData.append('title_2', this.getHomeObj.title_2)
      formData.append('title_3', this.getHomeObj.title_3)
      formData.append('title_4', this.getHomeObj.title_4)
      formData.append('title_5', this.getHomeObj.title_5)
      formData.append('title_6', this.getHomeObj.title_6)
      formData.append('title_7', this.getHomeObj.title_7)
      formData.append('title_8', this.getHomeObj.title_8)
      formData.append('button_1', this.getHomeObj.button_1)
      formData.append('button_2', this.getHomeObj.button_2)
      formData.append('button_3', this.getHomeObj.button_3)
      formData.append('button_4', this.getHomeObj.button_4)

      formData.append('button_1_link', this.getHomeObj.button_1_link)
      formData.append('button_2_link', this.getHomeObj.button_2_link)
      formData.append('button_3_link', this.getHomeObj.button_3_link)
      formData.append('button_4_link', this.getHomeObj.button_4_link)

      formData.append('description_1', this.getHomeObj.description_1)
      formData.append('description_2', this.getHomeObj.description_2)
      formData.append('description_3', this.getHomeObj.description_3)
      formData.append('description_4', this.getHomeObj.description_4)
      formData.append('description_5', this.getHomeObj.description_5)
      formData.append('description_6', this.getHomeObj.description_6)
      formData.append('description_7', this.getHomeObj.description_7)
      formData.append('description_8', this.getHomeObj.description_8)

      if (this.ieoImage && this.ieoImage != '') {
        formData.append('image_1', this.ieoImage);
      } else {
        formData.append('image_1', this.getHomeObj.image_1);
      }

      if (this.featureImage && this.featureImage != '') {
        formData.append('image_2', this.featureImage);
      } else {
        formData.append('image_2', this.getHomeObj.image_2);
      }
      if (this.Image3 && this.Image3 != '') {
        formData.append('image_3', this.Image3);
      } else {
        formData.append('image_3', this.getHomeObj.image_3);
      }
      if (this.Image4 && this.Image4 != '') {
        formData.append('image_4', this.Image4);
      } else {
        formData.append('image_4', this.getHomeObj.image_4);
      }

      this.apiService.filePostRequest('admin/updateHomePage', formData).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.onSubmit = false;
          this.toastrService.success(updateResponse.message, 'Success');
          this.getHomeDetails();
        }
        else {
          this.onSubmit = false;
          this.toastrService.danger(updateResponse.message, 'Error !!')
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


