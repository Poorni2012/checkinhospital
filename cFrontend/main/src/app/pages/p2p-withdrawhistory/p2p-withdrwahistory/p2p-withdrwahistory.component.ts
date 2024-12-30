import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'ngx-p2p-withdrwahistory',
  templateUrl: './p2p-withdrwahistory.component.html',
  styleUrls: ['./p2p-withdrwahistory.component.scss']
})
export class P2pWithdrwahistoryComponent implements OnInit {

  totalItems: number;
  pageSize: any = 10;
  currentPage = 1;
  page: number = 1;
  withdrawList: any = [];
  searchValue: any = '';

  public Number = Number;

  constructor(
  
    private apiService: ApiService,
    public router: Router,
    public spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getWithdrawList();
    let url = this.router.url
    this.apiService.ipCheck()
    this.apiService.checkaccess(url)
  }


  getWithdrawList() {
    this.spinnerService.show()
    let Withdrawparams = {
      page: this.page ? this.page : this.currentPage,
      length: 10,
      type: "Withdraw",
      search: this.searchValue
    };
    this.apiService.postRequest('admin/getTransactionHistory', Withdrawparams).subscribe((withdarwListResponse: any) => {
      if (withdarwListResponse.status) {
        this.withdrawList = withdarwListResponse.data;
        this.totalItems = withdarwListResponse.recordsTotal;
        this.spinnerService.hide();
      }
      else {
        this.withdrawList = [];
        this.totalItems = 0;
        this.spinnerService.hide();
      }
    })
  }


  pageChanged(): void {
    this.getWithdrawList();
  }

  public trackByFn(index: number, item: any): number {
    return item._id;
  }

}
