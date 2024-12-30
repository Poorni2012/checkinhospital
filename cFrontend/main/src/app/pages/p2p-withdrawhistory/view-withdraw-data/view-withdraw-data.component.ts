import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';
import { ConfirmationDialogService } from '../../../service/Confirm/confirmation-dialog.service';

@Component({
  selector: 'ngx-view-withdraw-data',
  templateUrl: './view-withdraw-data.component.html',
  styleUrls: ['./view-withdraw-data.component.scss']
})
export class ViewWithdrawDataComponent implements OnInit {

  currentId: any;
  withdrawDetails: any = {};
  Object = Object;
  isDisable: boolean = false;
  writeStatus: any;
  adminrandomId:any;
  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    public spinnerService: NgxSpinnerService,
    public _sanitizer: DomSanitizer,
    public confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
   this.adminrandomId =  Math.floor(100000 + Math.random() * 900000).toString();
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
        id: id
      }
      this.apiService.postRequest('withdraw/one_withdraw', withdrawParams).subscribe((withdrawResponse: any) => {
        if (withdrawResponse.status) {
          this.withdrawDetails = withdrawResponse.data;
          this.spinnerService.hide();
        }
      })
    }
  }

  withdrawApprove(status: any, otpResquest: any) {
    console.log("#")
    this.spinnerService.show();
    let approveParams = {
      _id: this.withdrawDetails._id,
      status: status,
      otp: otpResquest,
      adminrandomId:this.adminrandomId
    };
    this.apiService.postRequest('admin/admin_withdraw_approve', approveParams).subscribe((approveResponse: any) => {
      if (approveResponse.status) {
        this.toastrService.success(approveResponse.message, 'Success !!');
        this.adminrandomId = Math.floor(100000 + Math.random() * 900000).toString();
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

}
