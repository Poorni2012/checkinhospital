import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { SolarData } from '../../../@core/data/solar';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'ngx-p2p-deposithis',
  templateUrl: './p2p-deposithis.component.html',
  styleUrls: ['./p2p-deposithis.component.scss']
})
export class P2pDeposithisComponent implements OnInit {

  totalItems: number;
  pageSize: any = 10;
  currentPage = 1;
  page: number = 1;
  depositList: any = [];
  searchValue: any = '';

  public Number = Number;

  constructor(
    private themeService: NbThemeService,
    private solarService: SolarData,
    private apiService: ApiService,
    public router: Router,
    private toastrService: NbToastrService,
    public spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getDepositList();
    let url = this.router.url
    this.apiService.checkaccess(url)
    this.apiService.ipCheck()
  }
  getDepositList() {
    this.spinnerService.show()
    let depositParams = {
      page: this.page ? this.page : this.currentPage,
      length: 10,
      type: "Deposit",
      search: this.searchValue
    };
    this.apiService.postRequest('admin/getTransactionHistory', depositParams).subscribe((DepositListResponse: any) => {
      if (DepositListResponse.status) {
        this.depositList = DepositListResponse.data;
        this.totalItems = DepositListResponse.recordsTotal;
        this.spinnerService.hide();
      }
      else {
        this.depositList = [];
        this.totalItems = 0;
        this.spinnerService.hide();
      }
    })
  }


  pageChanged(): void {
    this.getDepositList();
  }

  public trackByFn(index: number, item: any): number {
    return item._id;
  }

  viewTransaction(transactionHash: any) {
    if (transactionHash && transactionHash != '') {
      this.apiService.copyText(transactionHash);
      this.toastrService.success('Transaction Hash Copied Successfully', 'Success');
    }
    else {
      this.toastrService.danger('Invalid Transaction Hash', 'Error');
    }
  }
}
