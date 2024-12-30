import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';
import { ConfirmationDialogService } from '../../../service/Confirm/confirmation-dialog.service';
import { CommonService } from '../../../service/common/common.service';

@Component({
  selector: 'ngx-view-listing-data',
  templateUrl: './view-listing-data.component.html',
  styleUrls: ['./view-listing-data.component.scss']
})
export class ViewListingDataComponent implements OnInit {

  currentId: any;
  withdrawDetails: any = {};
  Object = Object;
  isDisable: boolean = false;
  writeStatus: any;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    public spinnerService: NgxSpinnerService,
    public _sanitizer: DomSanitizer,
    public commonService: CommonService,
    public confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.currentId && this.currentId != '') {
      this.getWithdrawData(this.currentId);
    }
    let url = this.router.url
    this.apiService.ipCheck()
    this.apiService.checkaccess(url)
    this.apiService.readWriteAccess(url).then((writeStatus: any) => {
      this.writeStatus = writeStatus
    })
  }

  getWithdrawData(id: any) {
    if (id && id != '') {
      this.spinnerService.show();
      let withdrawParams = {
        postid: id
      }
      this.apiService.postRequest('admin/getAllList', withdrawParams).subscribe((withdrawResponse: any) => {
        if (withdrawResponse.status) {
          this.withdrawDetails = withdrawResponse.data;
          this.withdrawDetails.username = this.commonService.dataDecryption(withdrawResponse.data[0].user_details[0].username)
          this.withdrawDetails.currency_name = withdrawResponse.data[0].currency_name
          this.withdrawDetails.fiat_currency = withdrawResponse.data[0].fiat_currency_name
          this.withdrawDetails.price = withdrawResponse.data[0].price
          this.withdrawDetails.min_limit = withdrawResponse.data[0].min_limit
          this.withdrawDetails.max_limit = withdrawResponse.data[0].max_limit
          this.withdrawDetails.payment_method = withdrawResponse.data[0].payment_method[0]
          this.withdrawDetails.region = withdrawResponse.data[0].region
          this.withdrawDetails.terms_of_trade = withdrawResponse.data[0].terms_of_trade
          console.log("🚀 ~ ViewListingDataComponent ~ this.apiService.postRequest ~ this.withdrawDetails:", this.withdrawDetails)
          this.spinnerService.hide();
        }
      })
    }
  }

  withdrawApprove(status: any, otpResquest: any) {
    this.spinnerService.show();
    let approveParams = {
      _id: this.withdrawDetails._id,
      status: status,
      otp: otpResquest
    };
    this.apiService.postRequest('admin/admin_withdraw_approve', approveParams).subscribe((approveResponse: any) => {
      if (approveResponse.status) {
        this.toastrService.success(approveResponse.message, 'Success !!');
        setTimeout(() => {
          this.spinnerService.hide();
          this.router.navigate(['/pages/p2p-withdrawHistory']);
        }, 1000);
      }
      else {
        this.toastrService.danger(approveResponse.message, 'Error !!');
        this.spinnerService.hide();
      }
    })
  }


  editPost() {
    this.apiService.postRequest('admin/editList', { postid: this.withdrawDetails[0]._id, terms_of_trade: this.withdrawDetails.terms_of_trade }).subscribe((ress: any) => {
      if (ress.status) {
        this.toastrService.success(ress.message, 'Success !!');
        this.router.navigate(['/pages/getAllPosts']);

      }
      else {
        this.toastrService.danger(ress.message, 'Error !!');
        this.isDisable = false;
      }
    })
  }


  deletePost() {
    this.apiService.postRequest('exchange/deletePostData', { _id: this.withdrawDetails[0]._id }).subscribe((ress: any) => {
      if (ress.status) {
        this.toastrService.success(ress.message, 'Success !!');
        setTimeout(() => {
          this.spinnerService.hide();
          this.router.navigate(['/pages/getAllPosts']);
        }, 1000);
      }
      else {
        this.toastrService.danger(ress.message, 'Error !!');
        this.spinnerService.hide();
      }
    })
  }

  requestForOTP() {
    let otpParams = {
      _id: this.withdrawDetails._id
    };
    this.isDisable = true;
    this.apiService.postRequest('admin/admin_withdraw_sendotp', otpParams).subscribe((otpResponse: any) => {
      if (otpResponse.status) {
        this.toastrService.success(otpResponse.message, 'Success !!');
        this.openConfirmationDialogForApprove('confirm');
      }
      else {
        this.toastrService.danger(otpResponse.message, 'Error !!');
        this.isDisable = false;
      }
    })
  }


  public openConfirmationDialogForApprove(status: any) {
    this.confirmationDialogService
      .confirm("OTP for Withdraw Confirmation", "Please enter the OTP for withdraw confirmation !!", true, 'Confirm', 'Cancel', 'lg')
      .then(confirmed => {
        if (confirmed) {
          this.withdrawApprove(status, confirmed);
          this.isDisable = false;
        }
      })
      .catch(() => {
        this.toastrService.danger("Unable to update the request", 'Error !!');
        this.isDisable = false;
      })
  }

  public openConfirmationDialogForReject(status: any) {
    this.confirmationDialogService
      .confirm("Please confirm..", `Do you really want to Cancel this request ?`)
      .then(confirmed => {
        if (confirmed) {
          this.withdrawApprove(status, confirmed)
        }
      })
      .catch(() => {
        this.toastrService.danger("Unable to update the request", 'Error !!');
      })
  }


  public openConfirmationDialogForDelete(status: any) {
    this.confirmationDialogService
      .confirm("Please confirm..", `Do you really want to Delete this List`)
      .then(confirmed => {
        if (confirmed) {
          this.deletePost();
        }
      })
      .catch(() => {
        this.toastrService.danger("Unable to update the request", 'Error !!');
      })
  }

}
