import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { SolarData } from '../../../@core/data/solar';
import { ApiService } from '../../../service/api/api.service';
import { ConfirmationDialogService } from '../../../service/Confirm/confirmation-dialog.service';

@Component({
  selector: 'ngx-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss']
})
export class ListPaymentComponent implements OnInit {

  paymentList: any = [];
  paymentObj: any = {};
  onSubmit: boolean = false;

  totalItems: number;
  totalData: number;
  currentPage = 1;
  page: number = 1;
  pageSize: any = 10;
  private alive = true;

  solarValue: number;
  constructor(
    private themeService: NbThemeService,
    private solarService: SolarData,
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public confirmationDialogService: ConfirmationDialogService,
    public spinnerService: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {
    this.getpaymentList();
    this.getPaymentDetails();
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }

  getPaymentDetails() {
    this.apiService.getRequest('admin/GetsiteSetting').subscribe((paymentResponse: any) => {
      if (paymentResponse.status) {
        this.paymentObj = paymentResponse.data;
      }
    })
  }

  pageChanged(): void {
    this.getpaymentList();
  }

  getpaymentList() {
    this.spinnerService.show()
    let params = {
      page: this.page ? this.page : this.currentPage,
      length: 10,

    };
    this.apiService.postRequest('exchange/listPaymentType', params).subscribe((paymentResponse: any) => {
      if (paymentResponse.status) {
        this.paymentList = paymentResponse.data;
        this.totalItems = paymentResponse.totalData;
        this.spinnerService.hide()
      }
      else {
        this.spinnerService.hide();
      }
    })
  }



  updateStatus(_id: any, data: any) {
    if (_id && _id != '') {
      let updateObj = {
        _id: _id,
        status: data == true ? 1 : 0
      };
      this.apiService.postRequest('exchange/editPaymentStatus', updateObj).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.toastrService.success(updateResponse.message, 'Success');
          this.getpaymentList();
        }
        else {
          this.toastrService.danger(updateResponse.message, 'Error');
        }
      })
    }
  }

  deletePayment(_id: any) {
    if (_id && _id != '') {
      this.spinnerService.show()
      this.apiService.postRequest('exchange/deletePaymentType', { _id: _id }).subscribe((deleteResponse: any) => {
        if (deleteResponse.status) {
          this.toastrService.success(deleteResponse.message, 'Success');
          this.getpaymentList();
        }
        else {
          this.toastrService.danger(deleteResponse.message, 'Error !!');
        }
        this.spinnerService.hide();
      })
    }
  }

  public openConfirmationDialog(_id: any) {
    this.confirmationDialogService
      .confirm("Please confirm..", "Do you really want to delete this record?")
      .then(confirmed => {
        if (confirmed) {
          this.deletePayment(_id)
        }
      })
      .catch(() => {
        this.toastrService.danger("You cancelled to remove this item", 'Error');

      })
  }

  addPaymentTime(paymentTime: NgForm) {
    this.onSubmit = true;
    if (paymentTime.valid) {
      this.onSubmit = false;
      this.spinnerService.show();
      this.apiService.postRequest('admin/UpdateSiteSetting', this.paymentObj).subscribe((updatePayment: any) => {
        if (updatePayment.status) {
          this.toastrService.success(updatePayment.message, 'Success !!');
          this.spinnerService.hide();
          this.getPaymentDetails();
        }
        else {
          this.toastrService.danger(updatePayment.message, 'Error !!');
          this.spinnerService.hide();
        }
      })
    }
  }

  public trackByFn(index: number, item: any): number {
    return item._id;
  }


}
