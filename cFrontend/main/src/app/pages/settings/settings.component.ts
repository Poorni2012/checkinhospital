import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../service/api/api.service';
import { CommonService } from '../../service/common/common.service';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  selectedItem: any;
  onSubmit: boolean;
  sitemode: any
  site_kyc:any
  getsetObj: any = {};
  logoImage: any = ''
  sitelogos: any = '';
  favIcon: any;
  writeStatus: any;
  @Output() allOut = new EventEmitter();
  @Output() out = new EventEmitter();
  isSrc = false;
  newImg: any;
  eventvalue: any;
  newImgFav: any;
  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService,
  public imgService:CommonService) { }

  ngOnInit(): void {
    this.getSiteDetails();
    this.apiService.ipCheck()
    let url = this.router.url
    this.apiService.checkaccess(url)
  }

  getSiteDetails() {
    this.spinnerService.show()
    this.apiService.postRequest('admin/get_site_settings', {}).subscribe((siteResponse: any) => {
      if (siteResponse.status) {
        this.getsetObj = siteResponse.data;
        this.selectedItem = this.getsetObj.site_mode;
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
      }

    })
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var fileType = event.target.files[0].type;
      if (
        fileType != 'image/png' &&
        fileType != 'image/jpg' &&
        fileType != 'image/jpeg'
      ) {
        return this.toastrService.danger("Invalid image format.", 'Error !!');;
      }
      var reader = new FileReader();
      let file = event.target.files[0];
      this.sitelogos = file;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.getsetObj.site_logo = event.target.result;
      }
    }
  }

  uploadFileSiteLogo(file: any, event: any): any {
    console.log("🚀 ~ ProfileComponent ~ uploadFile ~ event:", event)
    console.log("🚀 ~ ProfileComponent ~ uploadFile ~ file:", file)

    if (event) {
      console.log("if events......")
      var reader = new FileReader();
      reader.readAsArrayBuffer(event.target.files[0]);
      reader.onloadend = (e: any) => {
        var bytes = (new Uint8Array(e.target.result)).subarray(0, 4);
        let header = '';
        for (let i = 0; i < bytes.length; i++) {
          header += bytes[i].toString(16);
        }
        if (((bytes[0] == 0xFF) && (bytes[1] == 0xD8))
          || ((bytes[0] == 0x89) && (bytes[1] == 0x50))
          || (bytes[0] == 0x00)
          || ((bytes[0] == 0x3C) && (bytes[1] == 0x73))
          || ((bytes[0] == 0x47) && (bytes[1] == 0x49))) {
          if (event) {
            var reader = new FileReader();
            const img = new Image();
            this.eventvalue = event.target.files[0]
            console.log("this.eventvalue.size", this.eventvalue.size)
            console.log("🚀 ~ ProfileComponent ~ uploadFile ~ this.eventvalue:", this.eventvalue)
            reader.readAsDataURL(event.target.files[0]); //read file as data url
            reader.onload = (event: any) => {
              img.src = reader.result as string;
              img.onload = () => {
                const height = img.naturalHeight;
                const width = img.naturalWidth;
                console.log(img.width <= 6000 && img.height <= 6000)                                                                      
                if (this.eventvalue.size >= 2 * 1024 *1024) { //<=2  diamen
                  this.toastrService.danger("'Upload image should be less than or equal to 2MB'", 'Error !!');;
                }else{
                  if (img.width <= 6000 && img.height <= 6000) {
                    this.imgService.isBytes.emit(false)
                  } else {
                    if (this.eventvalue.size >= 2) { //<=2  diamen
                      this.toastrService.danger("'Upload image should be less than or equal to 2MB'", 'Error !!');;                    
                    }
                    else {
                      this.imgService.isBytes.emit(true)
                      this.toastrService.danger("'Image Dimensions should be 6000 x 6000 Pixels.'", 'Error !!');;
                    }
                  }
                }
               
              };
            }
          }
        }
        else {
          this.imgService.isBytes.emit(true)
          this.toastrService.danger("'This does not look like a jpeg & png &svg Xml file'");;
        }

      }
    }

    let isImage = this.imgService.isFile(file, event, 'img');
    console.log("🚀 ~ EditTokenComponent ~ uploadFile ~ isImage:", isImage)

    const fileType = event.target.files && event.target.files[0];
    console.log("🚀 ~ EditTokenComponent ~ uploadFile ~ fileType:", fileType)

    if (!isImage) {
      return false;
    }
    this.imgService.isBytes.subscribe((suc: any) => {
      if (!suc) {
        if (event.target.files.length > 0) {
          this.newImg = event.target.files[0];
          console.log("🚀 ~ EditTokenComponent ~ this.imgService.isBytes.subscribe ~ this.newImg:", this.newImg)
          let newImgName = event.target.files[0].name;         
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]); // read file as data url
          reader.onload = (event: any) => {
            console.log("🚀 ~ this.imgService.isBytes.subscribe ~ event:", event)
            console.log("🚀 ~ ImageUploadComponent ~ this.dataService.isBytes.subscribe ~ event:", event.target.result)
            this.logoImage = event.target.result
            this.getsetObj.site_logo = event.target.result
            console.log("🚀 ~ SettingsComponent ~ this.imgService.isBytes.subscribe ~ this.getsetObj.site_logo:", this.getsetObj.site_logo)
            this.isSrc = true;           
            if (fileType.type.indexOf('image') > -1) {
            } else if (fileType.type.indexOf('video') > -1) {
            }
          };
        }
      }
      else {
        console.log("bytesss")
      }
    })


  }


  onSelectFileIcon(event: any) {
    if (event.target.files && event.target.files[0]) {
      var fileType = event.target.files[0].type;
      if (
        fileType != 'image/png' &&
        fileType != 'image/jpg' &&
        fileType != 'image/jpeg'
      ) {
        return this.toastrService.danger("Invalid image format.", 'Error !!');;
      }
      var reader = new FileReader();
      let file = event.target.files[0];
      this.favIcon = file;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.spinnerService.show();
        this.getsetObj.site_favicon = event.target.result;
        let favData = new FormData()
        favData.append('site_favicon', this.favIcon);
        this.apiService.filePostRequest('admin/fav_icon', favData).subscribe((favdataResponse: any) => {
          if (favdataResponse.status) {
            this.getsetObj.site_favicon = favdataResponse.data;
            console.log("🚀 ~ SettingsComponent ~ this.apiService.filePostRequest ~ this.getsetObj.site_favicon:", this.getsetObj.site_favicon)
            this.spinnerService.hide();
          }
          else {
            this.spinnerService.hide();
          }
        })
      }
    }
  }

  uploadFileFavIcon(file: any, event: any): any {
    console.log("🚀 ~ ProfileComponent ~ uploadFile ~ event:", event)
    console.log("🚀 ~ ProfileComponent ~ uploadFile ~ file:", file)

    if (event) {
      console.log("if events......")
      var reader = new FileReader();
      reader.readAsArrayBuffer(event.target.files[0]);
      reader.onloadend = (e: any) => {
        var bytes = (new Uint8Array(e.target.result)).subarray(0, 4);
        let header = '';
        for (let i = 0; i < bytes.length; i++) {
          header += bytes[i].toString(16);
        }
        if (((bytes[0] == 0xFF) && (bytes[1] == 0xD8))
          || ((bytes[0] == 0x89) && (bytes[1] == 0x50))
          || (bytes[0] == 0x00)
          || ((bytes[0] == 0x3C) && (bytes[1] == 0x73))
          || ((bytes[0] == 0x47) && (bytes[1] == 0x49))) {
          if (event) {
            var reader = new FileReader();
            const img = new Image();
            this.eventvalue = event.target.files[0]
            console.log("this.eventvalue.size", this.eventvalue.size)
            console.log("🚀 ~ ProfileComponent ~ uploadFile ~ this.eventvalue:", this.eventvalue)
            reader.readAsDataURL(event.target.files[0]); //read file as data url
            reader.onload = (event: any) => {
              img.src = reader.result as string;
              img.onload = () => {
                const height = img.naturalHeight;
                const width = img.naturalWidth;
                console.log(img.width <= 6000 && img.height <= 6000)                                                                      
                if (this.eventvalue.size >= 2 * 1024 *1024) { //<=2  diamen
                  this.toastrService.danger("'Upload image should be less than or equal to 2MB'", 'Error !!');;
                }else{
                  if (img.width <= 6000 && img.height <= 6000) {
                    this.imgService.isBytes.emit(false)
                  } else {
                    if (this.eventvalue.size >= 2) { //<=2  diamen
                      this.toastrService.danger("'Upload image should be less than or equal to 2MB'", 'Error !!');;                    
                    }
                    else {
                      this.imgService.isBytes.emit(true)
                      this.toastrService.danger("'Image Dimensions should be 6000 x 6000 Pixels.'", 'Error !!');;
                    }
                  }
                }
               
              };
            }
          }
        }
        else {
          this.imgService.isBytes.emit(true)
          this.toastrService.danger("'This does not look like a jpeg & png &svg Xml file'");;
        }

      }
    }

    let isImage = this.imgService.isFile(file, event, 'img');
    console.log("🚀 ~ EditTokenComponent ~ uploadFile ~ isImage:", isImage)

    const fileType = event.target.files && event.target.files[0];
    console.log("🚀 ~ EditTokenComponent ~ uploadFile ~ fileType:", fileType)

    if (!isImage) {
      return false;
    }
    this.imgService.isBytes.subscribe((suc: any) => {
      if (!suc) {
        if (event.target.files.length > 0) {
          this.newImgFav = event.target.files[0];
          console.log("🚀 ~ EditTokenComponent ~ this.imgService.isBytes.subscribe ~ this.newImg:", this.newImg)
          let newImgName = event.target.files[0].name;         
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]); // read file as data url
          reader.onload = (event: any) => {
            console.log("🚀 ~ this.imgService.isBytes.subscribe ~ event:", event)
            console.log("🚀 ~ ImageUploadComponent ~ this.dataService.isBytes.subscribe ~ event:", event.target.result)
            this.favIcon = event.target.result
            this.getsetObj.site_favicon = event.target.result
            // console.log("🚀 ~ this.imgService.isBytes.subscribe ~ this.getsetObj.profile_picture:", this.getsetObj.profile_picture)
            this.isSrc = true;           
            if (fileType.type.indexOf('image') > -1) {
            } else if (fileType.type.indexOf('video') > -1) {
            }
          };
        }
      }
      else {
        console.log("bytesss")
      }
    })


  }

  updateSitesettings(settingsForm: NgForm) {
    this.onSubmit = true;
    if (settingsForm.valid) {
      this.spinnerService.show()
      let formData = new FormData()
      formData.append('site_name', this.getsetObj.site_name)
      formData.append('site_email', this.getsetObj.site_email)
      formData.append('address', this.getsetObj.address)
      formData.append('city', this.getsetObj.city)
      formData.append('state', this.getsetObj.state)
      formData.append('country', this.getsetObj.country)
      formData.append('zip', this.getsetObj.zip)
      formData.append('contactno', this.getsetObj.contactno)
      formData.append('facebooklink', this.getsetObj.facebooklink)
      formData.append('telegramlink', this.getsetObj.telegramlink)
      formData.append('redditlink', this.getsetObj.redditlink)
      formData.append('instagramlink', this.getsetObj.instagramlink)
      formData.append('twitterlink', this.getsetObj.twitterlink)
      formData.append('site_mode', this.getsetObj.site_mode)
      formData.append('site_kyc', this.getsetObj.site_kyc)
      formData.append('copy_right_text', this.getsetObj.copy_right_text)
      formData.append('site_favicon', this.getsetObj.site_favicon);

      if (this.sitelogos && this.sitelogos != '') {
        formData.append('site_logo', this.newImg);
      } else {
        formData.append('site_logo', this.newImg);
      }

      this.apiService.filePostRequest('admin/update_site_settings', formData).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.toastrService.success(updateResponse.message, 'Success');
          this.getSiteDetails();
          this.spinnerService.hide();
        }
        else {
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


