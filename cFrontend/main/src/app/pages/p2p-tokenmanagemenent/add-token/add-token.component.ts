import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'ngx-add-token',
  templateUrl: './add-token.component.html',
  styleUrls: ['./add-token.component.scss']
})
export class AddTokenComponent implements OnInit {
  selectedItem: any;
  onSubmit: boolean;
  sitemode: any
  getsetObj: any = {
    network_type: '',
    fee_type: 'percentage',
    p2p_buyer_fee: 0,
    p2p_seller_fee: 0,
    fee: 0
  };
  logoImage: any = ''
  images: any = '';
  favIcon: any;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    
    public spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }

  get_token_info() {
    if (this.getsetObj.contract_address && this.getsetObj.contract_address != '' && this.getsetObj.contract_address.trim() != '') {
      this.spinnerService.show();
      var data = {
        "contractaddress": this.getsetObj.contract_address,
        "network": this.getsetObj.network_type
      }
      this.apiService.postRequest('currency/get_Token_info', data).subscribe(res => {
        if (res.status) {
          this.spinnerService.hide();
          this.getsetObj.currency_name = res.name;
          this.getsetObj.decimals = res.decimals;
          this.getsetObj.currency_symbol = res.symbol;
          this.getsetObj.total_supply = res.total_supply;
        }
        else {
          this.spinnerService.hide();
          this.toastrService.danger(res.message, 'Error');
        }
      });
    }
    else {
      this.toastrService.danger("Contract Address is Required", 'Error');
    }
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
      this.images = file;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.getsetObj.image = event.target.result;
      }
    }
  }

  updateSitesettings(settingsForm: NgForm) {
    this.onSubmit = true;
    if (settingsForm.valid) {
      this.spinnerService.show()
      let formData = new FormData()
      formData.append('contract_address', this.getsetObj.contract_address)
      formData.append('currency_symbol', this.getsetObj.currency_symbol)
      formData.append('network', 'token')
      formData.append('network_type', this.getsetObj.network_type)
      formData.append('currency_name', this.getsetObj.currency_name)
      formData.append('decimals', this.getsetObj.decimals)
      formData.append('total_supply', this.getsetObj.total_supply)
      formData.append('inr_value', this.getsetObj.inr_value)
      formData.append('usd_value', this.getsetObj.usd_value)
      formData.append('p2p_buyer_fee', this.getsetObj.p2p_buyer_fee)
      formData.append('p2p_seller_fee', this.getsetObj.p2p_seller_fee)
      formData.append('min_deposit', this.getsetObj.min_deposit)
      formData.append('max_deposit', this.getsetObj.max_deposit)
      formData.append('min_withdraw', this.getsetObj.min_withdraw)
      formData.append('max_withdraw', this.getsetObj.max_withdraw)
      formData.append('fee', this.getsetObj.fee)
      if (this.images && this.images != '') {
        formData.append('image', this.images);
      } else {
        formData.append('image', this.getsetObj.image);
      }
      this.apiService.filePostRequest('currency/addToken', formData).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.onSubmit = false;
          this.toastrService.success(updateResponse.message, 'Success');
          this.router.navigate([`/pages/p2p-token-management`]);
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
