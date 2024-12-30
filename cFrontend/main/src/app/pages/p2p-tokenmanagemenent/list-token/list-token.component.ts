import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';
import { ConfirmationDialogService } from '../../../service/Confirm/confirmation-dialog.service';
@Component({
  selector: 'ngx-list-token',
  templateUrl: './list-token.component.html',
  styleUrls: ['./list-token.component.scss']
})
export class ListTokenComponent implements OnInit {
  getCurrencyList: any = [];
  totalItems: number;
  totalCoinItems: number;
  currentPage = 1;
  page: number = 1;
  pageSize: any = 10;
  page1: any = 1;
  getTokenList: any = [];
  searchValue: any = '';
  searchTokenValue: any = '';

  constructor(private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService,
    public _sanitizer: DomSanitizer, public confirmationDialogService: ConfirmationDialogService
  ) {

  }

  ngOnInit(): void {
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.getcurrencyOneList();
    this.getTokensList()
    this.apiService.ipCheck()
  }


  pageChanged(): void {
    this.page = this.page;
    this.getcurrencyOneList();
  }

  getcurrencyOneList() {
    this.spinnerService.show();
    let params = {
      page: this.page ? this.page : this.currentPage,
      length: 10,
      type: "coin",
      search: this.searchValue
    };

    this.apiService.postRequest('currency/allCurrency', params).subscribe((coinResponse: any) => {
      if (coinResponse.status) {
        this.getCurrencyList = coinResponse.data;
        this.totalCoinItems = coinResponse.totalData;
        this.spinnerService.hide();
      }
      else {
        this.getCurrencyList = [];
        this.totalCoinItems = 0;
        this.spinnerService.hide();
      }
    })
  }

  pageChangedevent(): void {
    this.page1 = this.page1;
    this.getTokensList();
  }


  getTokensList() {
    let params = {
      page: this.page1 ? this.page1 : this.currentPage,
      length: 10,
      type: "token",
      search: this.searchTokenValue
    };

    this.apiService.postRequest('currency/allCurrency', params).subscribe((tokenResponse: any) => {
      if (tokenResponse.status) {
        this.getTokenList = tokenResponse.data;
        this.totalItems = tokenResponse.totalData;
      }
      else {
        this.getTokenList = [];
        this.totalItems = 0;
      }
    })
  }



  updateStatus(_id: any, data: any) {
    if (_id && _id != '') {
      let updateObj = {
        _id: _id,
        status: data == true ? 1 : 0
      };
      this.apiService.postRequest('currency/currencyStatus', updateObj).subscribe((updateResponse: any) => {
        if (updateResponse.status) {
          this.toastrService.success(updateResponse.message, 'Success');
          this.getTokensList();
        }
        else {
          this.toastrService.danger(updateResponse.message, 'Error');
        }
      })
    }
  }


  deleteBannerOne(_id: any, data: any) {
    if (_id && _id != '' && data == false) {
      this.spinnerService.show()
      this.apiService.postRequest('currency/deleteToken', { id: _id }).subscribe((deleteResponse: any) => {
        if (deleteResponse.status) {
          this.toastrService.success(deleteResponse.message, 'Success');
          this.router.navigate([`/pages/p2p-token-management`]);
          this.getcurrencyOneList();
          this.getTokensList()
        }
        else {
          this.toastrService.danger(deleteResponse.message, 'Error !!');
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 50);
      })
    } else if (_id && _id != '' && data == true) {
      this.toastrService.danger("Can't able to delete Coin", 'Error !!');
    }
  }

  public openConfirmationDialog(_id: any, data: any) {
    this.confirmationDialogService
      .confirm("Please confirm..", "Do you really want to delete this record?")
      .then(confirmed => {
        if (confirmed) {
          this.deleteBannerOne(_id, data)
        }
      })
      .catch(() => {
        this.toastrService.danger("Unable to remove this item", 'Error');

      })
  }

  public trackByFn(index: number, item: any): number {
    return item._id;
  }

  public trackByCoinFn(index: number, item: any): number {
    return item._id;
  }
}
