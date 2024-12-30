import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';

import { CommonService } from '../../../service/common/common.service';
@Component({
  selector: 'ngx-edit-token',
  templateUrl: './edit-token.component.html',
  styleUrls: ['./edit-token.component.scss']
})
export class EditTokenComponent implements OnInit {
  tokenoneObj: any = {};
  currentId: any;
  onSubmit: boolean = false;
  onDisabled: boolean;
  image: any = ''
  logoImage: any = ''
  @Output() allOut = new EventEmitter();
  @Output() out = new EventEmitter();
  isSrc = false;
  newImg: any;
  eventvalue: any;
  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    public spinnerService: NgxSpinnerService,
    public _sanitizer: DomSanitizer,
    public imgService:CommonService
  ) { }

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.currentId && this.currentId != '') {
      this.getCurrentCurrencyoneDetails(this.currentId);
    }
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }

  onSelectFile(event: any) {
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
        this.tokenoneObj.image = event.target.result;
      }
    }
  }


  uploadFile(file: any, event: any): any {
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
            this.tokenoneObj.image = event.target.result;
            this.logoImage = event.target.result
            console.log("🚀 ~ EditTokenComponent ~ this.imgService.isBytes.subscribe ~ this.tokenoneObj.image:", this.tokenoneObj.image)
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


  getCurrentCurrencyoneDetails(_id: any) {
    this.spinnerService.show()
    if (_id && _id != '') {
      this.apiService.postRequest('currency/getSingleToken', { id: _id }).subscribe((banneroneResponse: any) => {
        if (banneroneResponse.status) {
          this.tokenoneObj = banneroneResponse.data;
          this.spinnerService.hide()
        }
        else {
          this.tokenoneObj = {};
          this.spinnerService.hide()
        }
      })
    }
  }

  editCurrencyoneDetails(currencyEditForm: NgForm) {
    this.onSubmit = true
    if (currencyEditForm.valid) {
      this.onDisabled = true
      this.spinnerService.show()
      let formData = new FormData()
      formData.append('id', this.tokenoneObj._id)
      formData.append('currency_symbol', this.tokenoneObj.currency_symbol)
      formData.append('currency_name', this.tokenoneObj.currency_name)
      formData.append('decimal', this.tokenoneObj.decimal)
      formData.append('total_supply', this.tokenoneObj.total_supply)
      formData.append('inr_value', this.tokenoneObj.inr_value)
      formData.append('usd_value', this.tokenoneObj.usd_value)
      formData.append('p2p_buyer_fee', this.tokenoneObj.p2p_buyer_fee)
      formData.append('p2p_seller_fee', this.tokenoneObj.p2p_seller_fee)
      formData.append('min_deposit', this.tokenoneObj.min_deposit)
      formData.append('max_deposit', this.tokenoneObj.max_deposit)
      formData.append('min_withdraw', this.tokenoneObj.min_withdraw)
      formData.append('max_withdraw', this.tokenoneObj.max_withdraw)
      formData.append('fee', this.tokenoneObj.fee)
      if (this.image && this.image != '') {
        formData.append('image', this.newImg);
      }
      else {
        formData.append('image', this.newImg);
      }

      //postRequest
      this.apiService.postRequest('currency/editToken', formData).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.toastrService.success(updateResponse.message, 'Success');
          this.router.navigate([`/pages/p2p-token-management`]);
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
